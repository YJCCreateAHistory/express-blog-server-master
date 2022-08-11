const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")

/**
 * @date 2022-07-29
 * @Business 照片墙
 * @params {id}
 **/

exports.getImgList = async (req, res, next) => {
    try {
        let sql = _sql.imgPictureWall.list
        reqSqlPool.commonQuery(sql).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    } catch (e) {
        next(e)
    }
}

exports.createImgList = async (req, res, next) => {
    try {
        let sql = _sql.imgPictureWall.create
        let createParams = [
            params.id,
            params.img,
            tools.getDate()
        ]
        reqSqlPool.commonQuery(sql, createParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    } catch (e) {
        next(e)
    }
}

exports.updateImgList = async (req, res, next) => {
    try {
        let sql = _sql.imgPictureWall.update
        let updateParams = [
            params.id,
            params.img,
            params.insertTime
        ]
        reqSqlPool.commonQuery(sql,updateParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    } catch (e) {
        next(e)
    }
}

exports.deleteImgList = async (req, res, next) => {
    try {
        let sql = _sql.imgPictureWall.delete
        let deleteParams = [
            params.id,
        ]
        reqSqlPool.commonQuery(sql,deleteParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    } catch (e) {
        next(e)
    }
}