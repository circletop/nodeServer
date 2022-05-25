const connection = require('../connection')
const validator = require('validator');

const tagControllers = {
  showTags: (req, res)=> {
    let sql = 'SELECT * FROM `tags`'
    console.log(1)
    const params = req.body
    console.log(params);
    let content = []
    // 是否有多个参数
    let isMore = false

    let condition = []
    console.log(params, sql)
    Object.keys(params).map(key => {
      if (!['pageNum', 'pageSize'].includes(key)) {
        condition.push(`  ${key} LIKE ?`)
        content.push('%' + params[key] + '%')
      }
    })

    if (condition.length) {
      sql = sql + ' WHERE' + condition.join(' and')
    }
    console.log(sql)
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
  addTag:(req, res)=> {
    /*
    id tagName tagCode createDate
     */
    const { id, tagName, tagCode, createDate} = req.body
    console.log(req.body,1)
    if (validator.isEmpty(id)) {
      res.json({
        code: '0',
        err: 'id不能为空',
      })
      return false
    }
    if (validator.isEmpty(tagName)) {
      res.json({
        code: '0',
        err: '标签名不能为空',
      })
      return false
    }
    if (validator.isEmpty(tagCode)) {
      return res.json({
        code: '0',
        err: '标签编码',
      })
    }
    if (validator.isEmpty(createDate)) {
      return res.json({
        code: '0',
        err: '标签编码',
      })
    }
    // const params = [name, age, sex, country, password]
    let params = []
    let key = ''
    Object.keys(req.body).map(
      item => {
        if (['id', 'tagName', 'tagCode', 'createDate'].includes(item)) {
          key += `${item},`
          params.push(req.body[item])
        }
      }
    )
    key = key.substring(0, key.lastIndexOf(','))
    const sql = `INSERT INTO tags(${key}) VALUES(${new Array(params.length).fill('?').toString()})`
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
  modifyTag: ()=> {

  },
  delTag: ()=> {

  }
}
module.exports = tagControllers
