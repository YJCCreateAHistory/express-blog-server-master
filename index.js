const bodyParser = require('body-parser')
const cors = require('cors')// 解决跨域
const express = require('express') // express框架
const fs = require('fs');
const path = require('path');
// const connections = require('./common');
const err_handler = require('./middleWare/err_handler')

const app = express()
//json请求
app.use(bodyParser.json())
//解决跨域
app.use(cors())
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //跨域问题
    res.header('Access-Control-Allow-Headers', 'Content-Type,token');
    res.header('Content-Type','application/json;charset=utf-8');
    next();
});

// 表单请求
app.use(bodyParser.urlencoded({extended:true}));
// 数据库；连接测试
// app.get('/', (req, res)=>{
    
//     const article = connections.query("select * from article", (err, result)=>{
//         if(err){
//             throw err
//         }
//         console.log(req.body)
//         // console.log(result)
//         res.send('hahah')
//     })
// })
const router = require('./routes/index')
app.use(router)
app.use(err_handler())
// 监听端口
app.listen(5000) // 监听server5220端口

console.log('success listen at port:5220')
