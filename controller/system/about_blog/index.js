const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")


/**
 * @Business 关于博客
 * @params {id}
 * @date 2022-07-25
 * **/
exports.aboutWebBlog = async(req, res, next)=>{
    try{
        let sql = _sql.webAboutOptions.list + ` WHERE id= '${params.id}'`
        reqSqlPool.commonQuery(sql).then(data=>{
            let resData = data || {}
            res.json(resData);
        })
    }catch(e){
        next(E)
    }
}

/**
 * @Business 新建关于博客
 * @params {id, aboutTitle, aboutContent, inertTime, updateTime}
 * @date 2022-07-25
 * **/
 exports.createWebSiteAbout = async(req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.webAboutOptions.create
        let createParams = [
            tools.createRandomId(),
            params.aboutTitle,
            params.aboutContent,
            tools.getDate(),
            ''
        ]
        reqSqlPool.commonQuery(sql, createParams).then(data => {
            let resData = data || {}
            res.json(resData);
        })
    }catch(e){
        next(e)
    }
}



/**
 * @Business 修改关于博客
 * @params {id, aboutTitle, aboutContent, inertTime, updateTime}
 * @date 2022-07-25
 * **/
exports.updateWebSiteAbout = async(req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.webAboutOptions.update
        let updateParams = [
            params.aboutTitle,
            params.aboutContent,
            params.insertTime,
            tools.getDate()
        ]
        reqSqlPool.commonQuery(sql, updateParams).then(data => {
            let resData = data || {}
            res.json(resData);
        })
    }catch(e){
        next(e)
    }
}

/**
 * @Business 删除关于博客
 * @params {id}
 * @date 2022-07-25
 * **/
 exports.deleteWebSiteAbout = async(req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.webAboutOptions.delete
        let deleteParams = [
            params.id
        ]
        reqSqlPool.commonQuery(sql, deleteParams).then(data => {
            let resData = data || {}
            res.json(resData);
        })
    }catch(e){
        next(e)
    }
}