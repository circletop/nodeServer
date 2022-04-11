const mysql = require('mysql');
const configs = require('../config')

const pool = mysql.createPool({
  host: configs.mysql.host,
  port: configs.mysql.port,
  user: configs.mysql.user,
  password: configs.mysql.password,
  database: configs.mysql.database,
  connectTimeout: configs.mysql.connectTimeout,
});

/**
 *
 * @param sql 需要执行的 SQL
 * @param cb  执行完SQL 之后的回调
 */

module.exports = function connection(sql, content=[], cb) {
  pool.getConnection((err, conn) => {
    if (err) {
      cb(err, null, null)
    } else {
      conn.query(sql, content, function (qerr, result, fields) {
        conn.release()
        cb(qerr, result, fields)
      })
    }
  })
}
/**
 *
 * @type {string}
 *
 // 查
 const searchSQL = 'SELECT * FROM user_info'
 // 增
 const addSQL = 'INSERT INTO user_info(name,email,country) VALUES("dd",2,1)';
 // 改
 const modSql = 'UPDATE user_info SET name = ?,email = ? WHERE Id = ?';
 // 删
 const delSql = 'DELETE FROM websites where id=6';
 */

