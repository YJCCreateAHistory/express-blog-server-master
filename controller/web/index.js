/**
 *@author JC
 *@license web api
 *@date 2022-06-23
 **/

const webSQLMap = require('../../sqlMap/web/index');
const reqSQLPool = require('../../utils/common')
const tool = require('../../utils/tool')

// 站点
exports.webSite = async (req, res, next) => {
    try {
        // sql查询语句
        const sql = webSQLMap.webSite.list
        reqSQLPool.commonQuery(sql).then(data => {
            let resData = data || {}
            // 发送json数据
            res.json(resData)
        }).catch(err => {
            console.log("--查询站点信息失败--", err)
        })
    } catch (err) {
        next(err)
    }
}
// 社交
exports.webSocials = async (req, res, next) => {
    try {
        const sql = webSQLMap.webSocials.list
        const params = req.body
        console.log(params)
        reqSQLPool.commonQuery(sql, params).then(data => {
            // console.log(data)
            let resData = data || {}
            res.json(resData)
        }).catch(err => {
            console.log("--查询社交信息失败--", err)
        })
    } catch (err) {
        next(err)
    }
}
// 关于我
exports.webAboutMe = async (req, res, next) => {
    try {
        const sql = webSQLMap.webAboutMe.list
        const params = req.body
        // console.log(req)
        // console.log(params)
        reqSQLPool.commonQuery(sql, params).then(data => {
            
            let resData = data || {}
            res.json(resData)
        }).catch(err => {
            console.log('--查询关于我失败--', err)
        })
    } catch (err) {
        next(err)
    }
}
// 网站音乐
exports.webMusic = async (req, res, next) => {
    try {
        const sql = webSQLMap.webAboutMe.list
        const params = req.body
        reqSQLPool.commonQuery(sql, params).then(data => {
            let resData = data || {}
            res.json(resData)
        }).catch(err => {
            console.log('--查询关于失败--', err)
        })
    } catch (err) {
        next(err)
    }
}
// 文章列表查询

exports.articleOptions = async (req, res, next) => {
    try {
        let params = req.query
        console.log(params)
        let sql = webSQLMap.articleOptions.list
        let addViewsCountSql = webSQLMap.articleOptions.addViewCount
        reqSQLPool.commonQuery(sql).then(data => {
            let resData = data || {}
            console.log(resData);
            // 更新评论次数
            // let num = resData.records.viewsCount + 1

            // reqSQLPool.commonQuery(addViewsCountSql, [num, params.id]).then(data => {
            //     reqSQLPool.commonQuery(sql).then(data => {
            //         res.json(data || {})
            //     })
            // })
            res.json(resData || {})
        }).catch(err => {
            console.log("--查询文章详情失败--", err)
        })
    } catch (err) {

        next(err)
    }
}
// 查询文章详情
exports.webArticleDetail = async (req, res, next) => {
    try {
        let params = req.body
        console.log(params)
        let sql = webSQLMap.articleOptions.list + ` WHERE id = '${params.id}'`
        let addViewsCountSql = webSQLMap.articleOptions.addViewCount
        reqSQLPool.commonQuery(sql).then(data => {
            let resData = data || {}
            // 更新评论次数
            let num = resData.records.viewsCount + 1

            reqSQLPool.commonQuery(addViewsCountSql, [num, params.id]).then(data => {
                reqSQLPool.commonQuery(sql).then(data => {
                    res.json(data || {})
                })
            })
        }).catch(err => {
            console.log("--查询文章详情失败--", err)
        })
    } catch (err) {
        next(err)
    }
}

// 文章类型列表
exports.webArticleClassList = async (req, res, next) => {
    try {
        const sql = webSQLMap.articleClasses.list
        reqSQLPool.commonQuery(sql).then(data => {
            let resData = data || {}
            // console.log(resData)
            res.json(resData)
        }).catch(err => {
            console.log('--查询文章类型失败--', err)
        })
    } catch (err) {
        next(err)
    }
}
// 文章评论列表
exports.commentOptionsList = async (req, res, next) => {
    try {
        const sql = webSQLMap.commentOptions.list + ` WHERE postId='${params.params.id}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
        let params = req.body,
            total = 0
        const queryTotal = webSQLMap.commentOptions.count
        reqSQLPool.queryCount(queryTotal).then(data => {
            total = data
        })
        reqSQLPool.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log('--查询评论列表失败--', err)
        })
    } catch (err) {
        next(err)
    }
}
// 创建评论
exports.createComment = async (req, res, next) => {
    try {
        let params = req.body,
            sql = webSQLMap.commentOptions.create,
            querySQL = webSQLMap.articleOptions.list + ` where id='${params.postId}'`,
            addSQL = webSQLMap.commentOptions.addCommentCount,
            createCommentParams = [
                tool.createRandomId(),
                params.postId,
                params.parentId,
                params.fromUserId || tool.createRandomId(),
                params.fromUserName,
                params.fromUserAvatar,
                params.content,
                params.toUserId || '',
                params.toUserName,
                params.toUserAvatar,
                params.tool.getDate(),
                ''
            ]
        // 记录评论数
        // 查询那一条文章的评论
        reqSQLPool.commonQuery(querySQL).then(data => {
            let remNum = data || {}
            // 评论一次就+1
            let num = remNum.records[0].commentsCount + 1
            // 更新评论
            reqSQLPool.commonQuery(addSQL, [num, params.postId]).then(data => {
                reqSQLPool.commonQuery(sql, createCommentParams).then(data => {
                    let remNum = data || {}
                    res.json(remNum)
                })
            })
        })
    } catch (err) {
        next(err)
    }
}