// 路由入口
const express = require('express');
const router = express.Router()
const web = require('./web/index')
const system = require('./system/index')
/**
 *@author JC
 *@license：web Router 
 **/
router.use(web)
router.use(system)
module.exports = router