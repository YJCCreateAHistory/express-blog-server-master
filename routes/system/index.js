const express = require('express')
const router = express.Router()
const webController = require('../../controller/system/login/index')
const adminRoleCon = require('../../controller/system/admin_role/index')
const blogController = require('../../controller/system/blog/index')

/**
 * @Business 登录
 * @date 2022-07-22
 * **/
router.post("/xc-blog/admin/login", webController.login)

/**
 * @Business 用户管理
 * @date 2022-07-23
 * **/
router.post("/xc-blog/admin/role", adminRoleCon.adminRoleList)
router.post("/xc-blog/admin/create", adminRoleCon.createAdminRole)
/**
 * @Business 博客管理
 * @date 2022-07-25
 * **/
router.post("/xc-blog/admin/blog/list", blogController.getBlogList)
router.post("/xc-blog/admin/blog/create", blogController.createBlog)
module.exports = router
