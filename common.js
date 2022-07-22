const mysql = require('mysql')
// 创建连接池
let connections = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "root",
    database: "db",
    connectionTimeout: 5000,
    multipleStatements: false
})
// 错误抓取
connections.connect((err) => {
    if (err) {
        console.log("连接失败:-" + err.stack)
    } else {
        console.log("连接成功 Id:" + connections.threadId)
    }
})

module.exports = connections