const connection = require('../connection')


const userController = {
  // 获取用户信息 ，并返回到页面
  showAllUsers: (req, res) => {
    const sql = `SELECT * FROM user`
    connection(sql, function (err, result, fields) {
      if (!err) {
        res.json({
          err,
          result,
          fields
        })
      }
    })
  },
  addUser: (req, res) => {
    const { body } = req
    const sql = `INSERT INTO user() VALUES() `

  },
  updateUser: () => {

  },
  deleteUser: () => {

  },
  filterUser: (req, res) => {
    const sql = `SELECT * FROM user`
    connection(sql, function (err, result, fields) {
      if (!err) {
        res.json({
          err,
          result,
          fields
        })
      }
    })
  },

}

module.exports = userController
