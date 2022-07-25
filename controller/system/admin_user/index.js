const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")


/**
 * @Business 用户列表
 * @params {id, username}
 * @date 2022-07-25
 * **/
exports.getAdminUser = async(req, res, next)=>{
    try{
        let params = req.body
        let sql = '', queryTotal = '', total = 0
        if(params.id && params.username) {
            sql = _sql.sysAdminUser.list + ` WHERE id='${params.id}' AND username='${params.username}'`
            queryTotal = _sql.sysAdminUser.count +  ` WHERE id='${params.id}' AND username='${params.username}'`
        }else if(params.id) {
            sql = _sql.sysAdminUser.list + ` WHERE id='${params.id}'`
            queryTotal = _sql.sysAdminUser.count + ` WHERE id='${params.id}'`
        }else if(params.username){
            sql = _sql.sysAdminUser.list + ` WHERE username='${params.username}'`
            queryTotal = _sql.sysAdminUser.count +  ` WHERE username='${params.username}'`
        }else {
            sql = _sql.sysAdminUser.list
            queryTotal = _sql.sysAdminUser.count + ` WHERE id='${params.id}'`
        }
        reqSqlPool.queryCount(queryTotal).then(data=>{
            total = data
        })
        reqSqlPool.commonQuery(sql, params).then(data=>{
            let resData = data || {}
            resData.total = total
            res.json(resData)
        })
    }catch(e){
        next(err)
    }
}

/**
 * @Business 新增用户数据
 * @params {id, username, password, insertTime,updateTime}
 * @date 2022-07-25
 * **/
exports.createAdminUser = async(req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.sysAdminUser.create
        let createUserParams = [
            tools.createRandomId(),
            params.username,
            params.password,
            tools.getDate(),
            ''
        ]
        reqSqlPool.commonQuery(sql, createUserParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    }catch(e){
        next(err)
    }
}

/**
 * @Business 修改用户数据
 * @params {id, username, password, insertTime,updateTime}
 * @date 2022-07-25
 * **/
 exports.updateAdminUser = async(req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.sysAdminUser.update
        let updateUserParams = [
            params.id,
            params.username,
            params.password,
            params.insertTime,
            tools.getDate()
        ]
        reqSqlPool.commonQuery(sql, updateUserParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    }catch(e){
        next(err)
    }
}

/**
 * @Business 删除用户数据
 * @params {id}
 * @date 2022-07-25
 * **/

 exports.deleteAdminUser = async(req, res, next)=>{
    try{
        let params = req.body
        let sql = _sql.sysAdminUser.delete
        let deleteUser = [
            params.id,
        ]
        reqSqlPool.commonQuery(sql, deleteUser).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    }catch(e){
        next(err)
    }
}
