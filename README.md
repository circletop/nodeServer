# nodeServer
利用NodeJS+express+ MYSQL完成一个后台服务。

## 项目准备

从  [NodeJS官方网站 ](https://nodejs.org/en/) 下载并安装`nodejs`和`NPM`。安装完成之后执行以下命令查看安装情况：

```shell
# 查询npm 版本
PS D:\other\myself> npm -v
6.14.8

# 查询 node 版本
PS D:\other\myself> node -v
v14.15.0

```

若两个查询命令都能成功输出，则安装成功！

## 初始化

目前我的版本自带`npx`工具 ，可以直接用npx命令工具新建 

```shell
# 新建项目目录
PS D:\other\myself> mkdir node_test

    目录: D:\other\myself

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----          2022/4/8     13:21                node_test

# 进入项目目录
PS D:\other\myself> cd .\node_test\

# 执行 npx express-generator 初始化项目
PS D:\other\myself\node_test> npx express-generator
npx: installed 10 in 1.657s
  warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options
   create : public\
   create : public\javascripts\
   create : public\images\
   create : public\stylesheets\
   create : public\stylesheets\style.css
   create : routes\
   create : routes\index.js
   create : routes\users.js
   create : views\
   create : views\error.jade
   create : views\index.jade
   create : views\layout.jade
   create : app.js
   create : package.json
   create : bin\
   create : bin\www

   install dependencies:
     > npm install

   run the app:
     > SET DEBUG=node-test:* & npm start
```

### 目录

 .
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

- app.js      入口文件
- package.json   配置文件
- public      静态资源的文件
- routes   通过路由器创建的路由
- views     视图文件

## 配置

### MYSQL

1.  安装mysql 处理依赖

```sheLL
# 安装MYSQL处理依赖
PS D:\other\myself\node_test> npm install mysql
```

	2. 在项目根目录增加项目配置文件`config.js`，配置mysql基本配置
 	3. 新建`connection/index.js`文件用连接池的方式连接数据库，配置处理函数！

```javascript
// config.js
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
    console.log(message)
  }
}
const configs = {
  mysql,
  log
}
module.exports = configs

//  connection/index.js
const mysql = require('mysql');
const configs = require('../config')

const pool = mysql.createPool({
  host: configs.mysql.host,
  port: configs.mysql.port,
  user: configs.mysql.user,
  password: configs.mysql.password,
  database: configs.mysql.database,
  connectTimeout: configs.mysql.database,
});

/**
 *
 * @param sql 需要执行的 SQL
 * @param cb  执行完SQL 之后的回调
 */
module.exports = function connection(sql, cb) {
  pool.getConnection((err, conn)=> {
    if (err) {
      cb(err, null, null)
    } else {
      conn.query(sql,function (qerr, result, fields) {
        conn.release()
        cb(qerr, result, fields)
      })
    }
  })
}
```

