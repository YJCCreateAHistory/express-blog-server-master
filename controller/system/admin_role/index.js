const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")


/**
 *@Business 查询管理用户
 *@date 2022-07-25
 @params {id, roleName}
 * **/
exports.adminRoleList = async (req, res, next) => {
    try {
        let params = req.body,
            total = 0,
            queryTotal = ''
        let sql = ""
        //多条件查询
        if (params.id && params.roleName) {
            sql = _sql.sysAdminRole.list + ` WHERE id='${params.id}' AND roleName='${params.roleName}' `
            queryTotal = _sql.sysAdminRole.count + ` WHERE id='${params.id}' AND roleName='${params.roleName}'`
        } else if (params.id) {
            sql = _sql.sysAdminRole.list + ` WHERE id='${params.id}' `
            queryTotal = _sql.sysAdminRole.count + ` WHERE id='${params.id}'`
        } else if (params.roleName) {
            queryTotal = _sql.sysAdminRole.count + ` WHERE roleName='${params.roleName}'`
            sql = _sql.sysAdminRole.list + ` WHERE roleName='${params.roleName}' `
        } else {
            queryTotal = _sql.sysAdminRole.count
            sql = _sql.sysAdminRole.list
        }
        reqSqlPool.queryCount(queryTotal).then(data => {
            total = data
        })
        reqSqlPool.commonQuery(sql, params).then(data => {
            let resData = data || {}
            console.log(resData)
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询管理端用户错误--', err)
        })
    } catch (err) {
        next(err)
    }
}
/**
 *@Business 创建系统角色
 *@date 2022-07-25
 *@params {id, roleName, roleKey, roleAuth, insertDate}
 **/
exports.createAdminRole = async (req, res, next) => {
    try {
        let params = req.body
        // 创建的参数
        let paramsData = [
            tools.createRandomId(),
            params.roleName,
            params.roleKey,
            params.roleAuth,
            tools.getDate(),
            params.updateTime

        ]
        let sql = _sql.sysAdminRole.create
        reqSqlPool.commonQuery(sql, paramsData).then(data => {
            let createData = data || {}
            res.json(createData)
        })
    } catch (err) {
        next(err)
    }
}
/**
 *@Business 修改系统角色
 *@date 2022-07-25
 *@params {roleName, roleKey, roleAuth, updateDate}
 **/
exports.updateAdminRole = async (req, res, next) => {
    try {
        let params = req.body
        // 更新参数
        let updateData = [
            params.roleName,
            params.roleKey,
            params.roleAuth,
            params.insertTime,
            tools.getDate(),
            params.id
        ]
        let sql = _sql.sysAdminRole.update
        reqSqlPool.commonQuery(sql, updateData).then(data => {
            let resUpdatData = data || {}
            res.json(resUpdatData)
        })
    } catch (err) {
        next(err)
    }
}
/**
 *@Business 删除系统角色
 *@date 2022-07-25
 *@params {id}
 **/
exports.deleteAdminRole = async (req, res, next) => {
    try {
        let params = req.body
        let sql = _sql.sysAdminRole.delete
        let deleteAdminParams = [params.id]
        reqSqlPool.commonQuery(sql, deleteAdminParams).then(data => {
            let deleteAdmin = data || {}
            res.json(deleteAdmin)
        })
    } catch (e) {
        next(err)
    }
}