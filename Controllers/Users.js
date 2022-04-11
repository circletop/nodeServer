const connection = require('../connection')

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
    Object.keys(params).map(key=> {
      if (!['pageNum', 'pageSize'].includes(key)) {
        condition.push(`  ${key} LIKE ?`)
        content.push('%' + params[key] + '%')
      }
    })

    if (condition.length) {
      sql= sql + ' WHERE' + condition.join(' and')
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
    const { body } = req
    const sql = `INSERT INTO user() VALUES() `

  },
  updateUser: () => {

  },
  deleteUser: () => {

  },
}

module.exports = userController
