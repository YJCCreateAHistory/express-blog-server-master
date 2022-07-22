/**
 * @author JC 
 * @data 2022-07-20
 * @base 后台服务管理
 * **/
const sysSqlMap = {
    // 系统角色管理
    sysAdminRole: {
        list: "SELECT * FROM admin_role ",

        count: "SELECT COUNT(id) FROM admin_role",

        create: "INSERT INTO admin_role (id,roleName,roleKey,roleAuth,insertTime,updateTime) VALUES (?,?,?,?,?,?)",

        delete: "DELETE FROM admin_role WHERE id=?",

        update: "UPDATE admin_role SET roleName=?,roleKey=?,roleAuth=?,insertTime=?,updateTime=? WHERE id=?",
},
    // 系统用户管理
    sysAdminUser:{
        list: "SELECT * FROM admin_user ",

        count: "SELECT COUNT(id) FROM admin_user",

        create: "INSERT INTO admin_user (id,username,password,insertTime,updateTime) VALUES (?,?,?,?,?)",

        delete: "DELETE FROM admin_user WHERE id=?",

        update: "UPDATE admin_user SET username=?,password=?,insertTime=?,updateTime=? WHERE id=?",
},
    // 站点信息
    webSiteInfoOptions: {
        list: "SELECT * FROM web_site_info ",

        count: "SELECT COUNT(id) FROM web_site_info;",

        create: "INSERT INTO web_site_info (id,avatar,slogan,name,domain,notice,desc,insertTime,updateTime) VALUES (?,?,?,?,?,?,?,?,?)",

        delete: "DELETE FROM zy_web_site_info WHERE id=?",

        update: "UPDATE web_site_info SET avatar=?,slogan=?,name=?,domain=?,notice=?,desc=?,insertTime=?,updateTime=? WHERE id=?",
    },
       //web站点社交
       webSiteSocialsOptions: {
        list: "SELECT * FROM web_socials ",

        count: "SELECT COUNT(id) FROM web_socials;",

        create: "INSERT INTO web_socials (id,title,icon,color,href,insertTime,updateTime) VALUES (?,?,?,?,?,?,?)",

        delete: "DELETE FROM web_socials WHERE id=?",

        update: "UPDATE web_socials SET title=?,icon=?,color=?,href=?,insertTime=?,updateTime=? WHERE id=?",
    },
    //web站点音乐
    webMusicOptions: {
        list: "SELECT * FROM web_music ",

        count: "SELECT COUNT(id) FROM web_music;",

        create: "INSERT INTO web_music (id,name,artist,url,cover,lrc,insertTime,updateTime) VALUES (?,?,?,?,?,?,?,?)",

        delete: "DELETE FROM web_music WHERE id=?",

        update: "UPDATE web_music SET name=?,artist=?,url=?,cover=?,lrc=?,insertTime=?,updateTime=? WHERE id=?",

    },
     //web站点关于我
     webAboutOptions: {
        list: "SELECT * FROM web_about ",

        count: "SELECT COUNT(id) FROM web_about;",

        create: "INSERT INTO web_about (id,aboutTitle,aboutContent,insertTime,updateTime) VALUES (?,?,?,?,?)",

        delete: "DELETE FROM web_about WHERE id=?",

        update: "UPDATE web_about SET aboutTitle=?,aboutContent=?,insertTime=?,updateTime=? WHERE id=?",

    },
    //博文管理
    articleOptions: {
        list: "SELECT * FROM article ",

        count: "SELECT COUNT(id) FROM article;",

        create: "INSERT INTO article (id,classId,className,classValue,title,isPublish,summary,commentsCount,viewsCount,img,content,isTop,isHot,pubTime,insertTime,updateTime) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",

        delete: "DELETE FROM article WHERE id=?",

        update: "UPDATE article SET classId=?,className=?,classValue=?,isPublish=?,title=?,summary=?,commentsCount=?,viewsCount=?,img=?,content=?,isTop=?,isHot=?,pubTime=?,insertTime=?,updateTime=? WHERE id=?",

        publish: "UPDATE article SET isPublish=?,pubTime=? WHERE id=?",
    },
    //博文分类管理
    articleClassOpt: {
        list: "SELECT * FROM article_class ",

        count: "SELECT COUNT(id) FROM article_class;",

        create: "INSERT INTO article_class (id,className,classValue,path,query,insertTime,updateTime) VALUES (?,?,?,?,?,?,?)",

        delete: "DELETE FROM article_class WHERE id=?",

        update: "UPDATE article_class SET className=?,classValue=?,path=?,query=?,insertTime=?,updateTime=? WHERE id=?",

    },
      //博文评论管理
      articleCommentsOpt: {
        list: "SELECT * FROM comments ",

        count: "SELECT COUNT(id) FROM comments;",

        delete: "DELETE FROM comments WHERE id=?",

        deleteMore: "DELETE FROM comments WHERE parentId=?",

        subCommentCount: "UPDATE article SET commentsCount=? WHERE id=?",

    },
}
module.exports =  sysSqlMap