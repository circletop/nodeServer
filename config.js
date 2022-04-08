const mysql = {
  host: '192.168.37.131',
  port: '3306',
  user: 'root',
  password: 'mysecretpw',
  database: 'test',
  connectTimeout: 1000
}
const log = {
  error (message) {
    console.log('[knex error]', message)
  }
}
const configs = {
  mysql,
  // 打印错误
  log
}
module.exports = configs
