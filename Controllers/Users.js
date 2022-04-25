const connection = require('../connection')
const validator = require('validator');

const userController = {
  // 查询用户列表
  showUsers: (req, res) => {
    // 查询表所有数据
    let sql = 'SELECT * FROM `user`'
    const params = req.body
    let content = []
    // 是否有多个参数
    let isMore = false

    let condition = []
    Object.keys(params).map(key => {
      if (!['pageNum', 'pageSize'].includes(key)) {
        condition.push(`  ${key} LIKE ?`)
        content.push('%' + params[key] + '%')
      }
    })

    if (condition.length) {
      sql = sql + ' WHERE' + condition.join(' and')
    }

    // if (params.name) {
    // // 模糊查询两种方法
    // // sql += ' WHERE product_name LIKE '+mysql.escape('%'+req.body.name+'%')
    // sql += 'WHERE name LIKE ?'
    // content.push('%' + params.name + '%')
    // isMore = true
    // }
    //
    // if (params.age) {
    //   if (isMore) {
    //     sql += ' and age like ?'
    //   } else {
    //     sql += ' WHERE age like ?'
    //   }
    //   content.push('%' + params.age + '%')
    // }

    new Promise(((resolve, reject) => {
      connection(sql, content, function (err, result, fields) {
        if (!err) {
          resolve(result.length)
        } else {
          reject({
            err,
            result,
            fields
          })
        }
      })
    })).then(total => {
      if (params.pageNum || params.pageSize) {
        let current = params.pageNum
        let pageSize = params.pageSize
        sql += ' limit ?,?'
        content.push((current - 1) * pageSize, parseInt(pageSize))
      }
      connection(sql, content, function (err, result, fields) {
        if (!err) {
          res.json({
            code: '0000',
            result,
            total
          })
        } else {
          res.json({
            code: '0',
            err,
            result,
          })
        }
      })
    }).catch(
      error => {
        const { err, result, fields } = error
        res.json({
          code: '0',
          err,
          result,
          fields
        })
      }
    )
  },
  addUser: (req, res) => {
    //  name age sex country password
    const { name, age, sex, country, password } = req.body
    if (validator.isEmpty(name)) {
      res.json({
        code: '0',
        err: '用户名不能为空',
      })
      return false
    }
    if (validator.isEmpty(age)) {
      res.json({
        code: '0',
        err: '账户年龄不能为空',
      })
      return false
    }
    if (validator.isEmpty(password)) {
      console.log(req.body, 1)
      return res.json({
        code: '0',
        err: '账户密码不能为空',
      })
    }
    // const params = [name, age, sex, country, password]
    let params = []
    let key = ''
    Object.keys(req.body).map(
      item => {
        if (['name', 'age', 'sex', 'country', 'password'].includes(item)) {
          key += `${item},`
          params.push(req.body[item])
        }
      }
    )
    key = key.substring(0, key.lastIndexOf(','))
    const sql = `INSERT INTO user(${key}) VALUES(${new Array(params.length).fill('?').toString()})`
    connection(sql, params, function (err, result, fields) {
      if (!err) {
        res.json({
          code: '0000',
          result
        })
      } else {
        res.json({
          code: '0',
          err,
          result,
        })
      }
    })
  },
  updateUser: (req, res) => {
    const { id } = req.params
    const params = req.body
    const keys = Object.keys(params).map(item => {
      return `${item} = ?`
    }).toString()
    const condition = Object.values(params)
    console.log(keys, params)
    const sql = `UPDATE user SET  ${keys} where id = ${id}`
    connection(sql, condition, function (err, result, filed) {
      if (!err) {
        res.json({
          code: '0000',
          result
        })
      } else {
        res.json({
          code: '0',
          err,
          result,
        })
      }
    })
  },
  deleteUser: (req, res) => {
    const { id } = req.params
    const sql = `DELETE FROM user where id=${id}`
    connection(sql,[], (err, result, field)=> {
      if (!err) {
        res.json({
          code: '0000',
          result
        })
      } else {
        res.json({
          code: '0',
          err,
          result,
        })
      }
    })
  },
}

module.exports = userController
