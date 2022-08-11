const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")

/**
 * @Business 社交信息
 * @params {id}
 * @date 2022-07-25
 * **/
exports.getWebSocialsInfo = async (req, res, next) => {
    try {
        let sql = _sql.webSiteSocialsOptions.list
        reqSqlPool.commonQuery(sql).then(data => {
            let resData = data || {}
            res.json(resData);
        })
    } catch (e) {
        next(e)
    }
}

/**
 * @Business 新增社交信息
 * @params {id,title, icon, color, href}
 * @date 2022-07-25
 * **/
 exports.createWebSocialsInfo = async (req, res, next) => {
    try {
        let params = req.body
        let sql = _sql.webSiteSocialsOptions.create
        let createParams = [
            params.id,
            params.title,
            params.icon,
            params.color,
            params.href,
            tools.getDate(),
            ''
        ]
        reqSqlPool.commonQuery(sql,createParams).then(data => {
            let resData = data || {}
            res.json(resData);
        })
    } catch (e) {
        next(e)
    }
}
/**
 * @Business 修改社交信息
 * @params {id,title, icon, color, href}
 * @date 2022-07-25
 * **/
 exports.updateWebSocialsInfo = async (req, res, next) => {
    try {
        let params = req.body
        let sql = _sql.webSiteSocialsOptions.update
        let updateParams = [
            params.id,
            params.title,
            params.icon,
            params.color,
            params.href,
            params.insertTime,
            tools.getDate()
        ]
        reqSqlPool.commonQuery(sql,updateParams).then(data => {
            let resData = data || {}
            res.json(resData);
        })
    } catch (e) {
        next(e)
    }
}

/**
 * @Business 删除社交信息
 * @params {id}
 * @date 2022-07-25
 * **/
 exports.deleteWebSocialsInfo = async (req, res, next) => {
    try {
        let params = req.body
        let sql = _sql.webSiteSocialsOptions.delete
        let deleteParams = [
            params.id
        ]
        reqSqlPool.commonQuery(sql, deleteParams).then(data => {
            let resData = data || {}
            res.json(resData);
        })
    } catch (e) {
        next(e)
    }
}