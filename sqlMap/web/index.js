/**
 *@author JC
 *@license：web sql
 *@date 2022-07-15
 **/
const webSQL = {
    webSite:{
        list:"select * from web_site_info"
    },
    webSocials:{
        list:"select * from web_socials"
    },
    webAboutMe:{
        list:"select * from web_about"
    },
    webMusic:{
        list:"select * from web_music"
    },
    // 博客文章查询
    articleOptions:{
        list:"select * from article",
        count:"select count(id) from article",
        addViewCount:"update article set viewsCount=? where id=?"
    },
    // 博客文章分类
    articleClasses:{
        list:"select * from article_class",
        count:"select count(id) from article",
        addViewCount:"update article set viewsCount=? where id=?"
    },
    
    // 评论
    commentOptions: {
        list:"select * from comment",
        create:"insert into comment (id,postId,parentId,fromUserId,fromUserName,fromUserAvatar,content,toUserId,toUserName,toUserAvatar,createTime,updateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        count: "select count(id) from comments",

        addViewsCount: "update comments set viewsCount=? where id=?",

        addCommentCount: "update article set commentsCount=? where id=?",
    }

}
module.exports = webSQL