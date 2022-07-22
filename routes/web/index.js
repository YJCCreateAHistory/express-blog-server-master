/**
 *@author JC 
 *@date 2022-06-23
 *@license: web router
 **/
const express = require('express')
const router = express.Router()
const webController = require('../../controller/web/index')

const reqSQLPool = require('../../utils/common')
const webSQLMap = require('../../sqlMap/web/index');

/*****站点信息*****/
router.get('/xc-blog/web/site/info', webController.webSite) // 站点信息
router.post('/xc-blog/web/aboutMe', webController.webAboutMe) // 关于我
router.post('/xc-blog/web/socials', webController.webSocials) // 社交
router.post('/xc-blog/web/music', webController.webMusic) // 音乐
// router.post('/xc-blog/web/aboutMe', function(req, res){
//     console.log(req.body)
//     res.status(200).send(req.body)
// }) // 关于我
/*****博文数据*****/


router.post('/xc-blog/web/article/list', webController.articleOptions) // 文章列表

router.post('/xc-blog/web/article/detail', webController.webArticleDetail) // 文章详情
router.get('/xc-blog/web/article_class/list', webController.webArticleClassList) // 文章分类列表
router.post('/xc-blog/web/comment/list', webController.commentOptionsList) // 评论列表
router.post('/xc-blog/web/comment/create', webController.createComment) // 创建评论

module.exports = router