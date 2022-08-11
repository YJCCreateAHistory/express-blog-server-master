const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")

/**
 * @Business 站点信息
 * @params {id}
 * @date 2022-07-25
 * **/
exports.getWebSiteInfo = async (req, res, next)=>{
    try{
        let sql = _sql.webSiteInfoOptions.list
        reqSqlPool.commonQuery(sql).then(data=>{
            let resData = data || {}
            res.json(resData);
        }) 
    }catch(e){  
        next(e)
    } 
}

/**
 * @Business 修改站点信息
 * @params {id, avatar, slogan, name, domain, notice, psc, inertTime, updateTime}
 * @date 2022-07-25
 * **/
exports.updateWebSiteInfo = async (req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.webSiteInfoOptions.update
        let updateSiteParams = [
            params.avatar,
            params.slogan,
            params.name,
            params.domain,
            params.notice,
            params.psc,
            params.insertTime,
            tools.getDate(),
            params.id
        ]
        reqSqlPool.commonQuery(sql, updateSiteParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    }catch(e){

    }
}

/**
 * @Business 添加站点信息
 * @params {id, avatar, slogan, name, domain, notice, psc, inertTime, updateTime}
 * @date 2022-07-25
 * **/
 exports.createWebSiteInfo = async (req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.webSiteInfoOptions.create
        let createSiteParams = [
            tools.createRandomId(),
            params.avatar,
            params.slogan,
            params.name,
            params.domain,
            params.notice,
            params.psc,
            tools.getDate(),
            ''
        ]
        reqSqlPool.commonQuery(sql, createSiteParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    }catch(e){

    }
}
/**
 * @Business 删除站点信息
 * @params {id}
 * @date 2022-07-25
 * **/
 exports.deleteWebSiteInfo = async (req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.webSiteInfoOptions.delete
        let deleteSiteParams = [
           params.id
        ]
        reqSqlPool.commonQuery(sql, deleteSiteParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    }catch(e){

    }
}


