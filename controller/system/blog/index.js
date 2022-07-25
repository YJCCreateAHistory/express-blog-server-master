/**
 * @author JC
 * @date 2022-07-23
 * @license 博文管理
 **/
const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")

exports.getBlogList = async (req, res, next) => {
    try {
        let sql = _sql.articleOptions.list
        reqSqlPool.commonQuery(sql).then(data => {
            let resData = data || {}
            res.json(resData)
        }).catch(err => {console.log("--查询博文失败--",err)})
    } catch (err) {
        next(err)
    }
}