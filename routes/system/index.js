const express = require('express')
const router = express.Router()
const webLoginController = require('../../controller/system/login/index')
const adminRoleController = require('../../controller/system/admin_role/index')
const blogController = require('../../controller/system/blog/index')
const userRoleController = require('../../controller/system/admin_user/index')
const webSiteInfoController = require('../../controller/system/web_site/index')
const aboutController = require('../../controller/system/about_blog/index')
const webSocialsController = require('../../controller/system/web_socials/index')
const imgController = require('../../controller/system/WEB_IMG_ALL/index')
/**
 * @Business 登录
 * @date 2022-07-22
 * **/
router.post("/xc-blog/admin/login", webLoginController.login)


/**
 * @Business 系统用户管理
 * @date 2022-07-23
 * **/

router.post("/xc-blog/admin/role", adminRoleController.adminRoleList)
router.post("/xc-blog/admin/create", adminRoleController.createAdminRole)
router.post("/xc-blog/admin/delete", adminRoleController.deleteAdminRole)
router.post("/xc-blog/admin/update", adminRoleController.updateAdminRole)

/**
 * @Business 博客管理
 * @date 2022-07-25
 * **/
router.post("/xc-blog/admin/blog/create", blogController.createBlog)
router.post("/xc-blog/admin/blog/delete", blogController.deleteBlog)
router.post("/xc-blog/admin/blog/update", blogController.updateBlog) 
router.post("/xc-blog/admin/blog/list", blogController.getBlogList) 
router.post("/xc-blog/admin/blog/classes", blogController.getBlogArticleClasses)
router.post("/xc-blog/admin/blog/createClasses", blogController.createBlogArticleClasses)
router.post("/xc-blog/admin/blog/deleteClasses", blogController.deleteBlogArticleClasses)
router.post("/xc-blog/admin/blog/updateClasses", blogController.updateBlogArticleClasses)
/**
 * @Business 用户管理
 * @date 2022-07-25
 * **/
router.post("/xc-blog/admin/user/list", userRoleController.getAdminUser) 
router.post("/xc-blog/admin/user/create",userRoleController.createAdminUser)
router.post("/xc-blog/admin/user/delete",userRoleController.deleteAdminUser)
router.post("/xc-blog/admin/user/update",userRoleController.updateAdminUser)



/**
 * @Business 站点信息管理
 * @date 2022-07-25
 * **/
router.post("/xc-blog/admin/site/info",webSiteInfoController.getWebSiteInfo)
router.post("/xc-blog/admin/site/update",webSiteInfoController.updateWebSiteInfo)
router.post("/xc-blog/admin/site/delete",webSiteInfoController.deleteWebSiteInfo)
router.post("/xc-blog/admin/site/create",webSiteInfoController.createWebSiteInfo)


/**
 * @Business 关于
 * @date 2022-07-25
 * **/
router.get("/xc-blog/admin/about/info", aboutController.aboutWebBlog);
router.post("/xc-blog/admin/about/create", aboutController.createWebSiteAbout)
router.post("/xc-blog/admin/about/delete", aboutController.deleteWebSiteAbout)
router.post("/xc-blog/admin/about/update", aboutController.updateWebSiteAbout)   


/**
 * @Business 社交
 * @date 2022-07-25
 * **/
router.get("/xc-blog/admin/socials/info", webSocialsController.getWebSocialsInfo)
router.post("/xc-blog/admin/socials/create", webSocialsController.createWebSocialsInfo)
router.post("/xc-blog/admin/socials/update", webSocialsController.updateWebSocialsInfo)
router.post("/xc-blog/admin/socials/delete", webSocialsController.deleteWebSocialsInfo)

/**
 * @Business 照片
 * @date 2022-07-29
 * **/
router.get("/xc-blog/admin/img/list", imgController.getImgList)
router.post("/xc-blog/admin/img/create", imgController.createImgList)
router.post("/xc-blog/admin/img/update", imgController.updateImgList)
router.post("/xc-blog/admin/img/delete", imgController.deleteImgList)

module.exports = router