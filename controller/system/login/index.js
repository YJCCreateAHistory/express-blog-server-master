/**
 * @author JC
 * @date 2022-07-20
 * @license 登录业务
 **/
const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const {
    setToken
} = require("../../../utils/token")
let {aes} = require("../../../utils/crypto")
exports.login = async (req, res, next) => {
    try {
        let params = req.body
        // let pwd = aes.de(params.userPassword) // 加密
        // 查询语句
        let sql = _sql.sysAdminUser.list + ` where username='${params.loginAccount}' and password='${params.userPassword}'`
        // 发起请求
        reqSqlPool.commonQuery(sql, params).then(data => {
            let resData = data || {}
            // console.log(resData)
            if (resData.records) {
                // 生成token
                setToken(params.loginAccount, params.userPassword).then(_token => {
                    let _data = {
                        data: {
                            adminInfo: {
                                "orgName": "",
                                "roles": ["超级管理员"],
                                "name": "admin",
                                "perms": ["*"],
                                "userNickName": "超级管理员",
                                "userId": "1",
                                "orgId": "O1-1"
                            },
                            token: _token
                        },
                        Msg: "登录成功",
                        error: "0"
                    }
                    res.status(200).json(_data)
                })
            } else {

                let _data = {
                    Msg: "用户名或者密码错误",
                    error: 602
                }
                res.status(200).json(_data)
            }

        }).catch(e => {
            console.log('--查询登录用户信息错误--', e)
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}