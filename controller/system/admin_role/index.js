/**
 * @author JC
 * @date 2022-07-23
 * @license 系统角色
 **/
const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")

exports.getAllAdmin = async (req, res, next) => {
    try {
        let sql = _sql.sysAdminRole.list
        reqSqlPool.commonQuery(sql).then(data => {
            let resData = data || {}
            res.json(resData)
        }).catch(err => {
            console.log("--管理端用户数据查询失败", err)
        })
    } catch (e) {
        next(e)
    }
}
// exports.adminRoleList = async (req, res, next) => {
//     try {
//         let params = req.body,
//             total = 0,
//             queryTotal = ''
//         let sql = ""
//         //多条件查询
//         // console.log(req)
//         console.log(req.body)
//         if (params.params.id && params.params.roleName) {
//             sql = $_sql.sysAdminRole.list + ` WHERE id='${params.params.id}' AND roleName='${params.params.roleName}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
//             queryTotal = $_sql.sysAdminRole.count + ` WHERE id='${params.params.id}' AND roleName='${params.params.roleName}'`
//         } else if (params.params.id) {
//             sql = $_sql.sysAdminRole.list + ` WHERE id='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
//             queryTotal = $_sql.sysAdminRole.count + ` WHERE id='${params.params.id}'`
//         } else if (params.params.roleName) {
//             queryTotal = $_sql.sysAdminRole.count + ` WHERE roleName='${params.params.roleName}'`
//             sql = $_sql.sysAdminRole.list + ` WHERE roleName='${params.params.roleName}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
//         } else {
//             queryTotal = $_sql.sysAdminRole.count
//             sql = $_sql.sysAdminRole.list + ` ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
//         }
//         reqSqlPool.queryCount(queryTotal).then(data => {
//             total = data
//         })
//         reqSqlPool.commonQuery(sql, params).then(data => {
//             let resData = data || {}
//             console.log(resData)
//             resData.total = total
//             res.json(resData)
//         }).catch(err => {
//             console.log('--查询管理端用户错误--', err)
//         })
//     } catch (err) {
//         next(err)
//     }
// }