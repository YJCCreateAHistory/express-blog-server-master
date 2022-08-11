const reqSqlPool = require("../../../utils/common")
const _sql = require("../../../sqlMap/system/index")
const tools = require("../../../utils/tool")
/**
 * @date 2022-07-23
 * @Business 博文列表
 * @params {id, className, title}
 **/
exports.getBlogList = async (req, res, next) => {
    try {
        let sql = '', queryTotal = '', total = 0
        let params = req.body
        console.log(params)
        if (params.id) {
            sql = _sql.articleOptions.list + ` WHERE id='${params.id}'`
            queryTotal = _sql.articleOptions.count + ` WHERE id='${params.id}'` 
        } else if (params.className) {
            sql = _sql.articleOptions.list + ` WHERE className='${params.className}' `
            queryTotal = _sql.articleOptions.count + ` WHERE className='${params.className}'` 
        } else if (params.title) {
            sql = _sql.articleOptions.list + ` WHERE title='${params.title}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
            queryTotal = _sql.articleOptions.count + ` WHERE title='${params.title}'` 
        
        } else if (params.classId) {
            sql = _sql.articleOptions.list + ` WHERE classId='${params.classId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
            queryTotal = _sql.articleOptions.count + ` WHERE classId='${params.classId}'` 
        } else if (params.id && params.className && params.classId) {
            sql = _sql.articleOptions.list + ` WHERE id='${params.id}' AND className='${params.className}' AND classId='${params.classId}' ORDER BY ${params.orderBy} ${params.orderType} LIMIT ${params.size} OFFSET ${params.size * (params.current - 1)}`
            queryTotal = _sql.articleOptions.count + ` WHERE classId='${params.classId}' AND title='${params.title}' AND className='${params.className}' AND id='${params.id}'`      
        } else {
            sql = _sql.articleOptions.list
            queryTotal = _sql.articleOptions.count
        }
        reqSqlPool.queryCount(queryTotal).then(data=>{
            total = data
        })
        reqSqlPool.commonQuery(sql, params).then(data => {
            // console.log(data)
            let resData = data || {}
            resData.total = total
            res.json(resData)
        }).catch(err => {
            console.log("--查询博文失败--", err)
        })
    } catch (err) {
        next(err)
    }
}


/**
 * @author JC
 * @date 2022-07-23
 * @Business 创建博文
 **/
exports.createBlog = async (req, res, next) => {
    try {
        let params = req.body
        console.log(params)
        let sql = _sql.articleOptions.create
        let classSql = _sql.articleOptions.list + ` WHERE classId='${params.classId}'`
        // 拿到分类数据
        reqSqlPool.commonQuery(classSql).then(data => {
            let resClass = data || {}
            if (resClass.error) {
                resClass.json(resClass)
            } else {
                // 博文信
                let blogParams = [
                    tools.createRandomId(),
                    tools.createRandomId(),
                    params.className,
                    params.classValue,
                    params.title,
                    params.isPublish,
                    params.summary,
                    0, 0,
                    params.img,
                    params.content,
                    params.isTop,
                    params.isHot,
                    params.pubTime,
                    tools.getDate(),
                    ' ',
                ] 
                reqSqlPool.commonQuery(sql, blogParams).then(data => {
                    let resData = data || {}
                    res.json(resData)
                })              
            }
        }).catch(err => {
            console.log("--新增文章失败--", err)
        })
    } catch (err) {
        next(err)
    }
}
/**
 * @date 2022-07-23
 * @Business 修改博文
 **/
exports.updateBlog = async (req, res, next) => {
    try {
        let params = req.body
        let sql = _sql.articleOptions.update
        let classSql = _sql.articleOptions.list + ` WHERE classId='${params.classId}'`
        // 拿到分类数据
        reqSqlPool.commonQuery(classSql).then(data => {
            let resClass = data || {}
            if (resClass.error) {
                resClass.json(resClass)
            } else {
                // 修改博文信息
                let blogParams = [
                    params.classId,
                    params.className,
                    params.classValue,
                    params.isPublish,
                    params.title,
                    params.summary,
                    params.commentsCount,
                    params.viewsCount,
                    params.img,
                    params.content,
                    params.isTop,
                    params.isHot,
                    params.pubTime,
                    params.insertTime,
                    tools.getDate(),
                    params.id
                ]

                reqSqlPool.commonQuery(sql, blogParams).then(data => {
                    let resData = data || {}
                    res.json(resData)
                })
            }
        }).catch(err => {
            console.log("--修改文章失败--", err)
        })
    } catch (err) {
        next(err)
    }
}


/**
 * @date 2022-07-25
 * @Business 删除博文
 * @params {id}
 **/
exports.deleteBlog = async (req, res, next) => {
    try {
        let params = req.body
        let sql = _sql.articleOptions.delete
        let deleteParams = [params.id]
        reqSqlPool.commonQuery(sql, deleteParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    } catch (err) {
        next(err)
    }
}

/**
 * @date 2022-07-25
 * @Business 博文分类列表
 * @params {id}
 **/
exports.getBlogArticleClasses = async (req, res, next) => {
    try {
        let params = req.body
        let sql = '',
            queryTotal = '',
            total = 0
        // 多条件查询
        if (params.id && params.className) {
            sql = _sql.articleClassOpt.list + ` WHERE id='${params.id}' AND className='${params.className}' `
            queryTotal = _sql.articleClassOpt.list + ` WHERE id='${params.id}' AND className='${params.className}'`
        } else if (params.id) {
            sql = _sql.articleClassOpt.list + ` WHERE id='${params.id}' `
            queryTotal = _sql.articleClassOpt.count + ` WHERE id='${params.id}'`
        } else if (params.className) {
            sql = _sql.articleClassOpt.list + ` WHERE className='${params.className}'`
            queryTotal = _sql.articleClassOpt.count + ` WHERE className='${params.className}'`
        } else {
            sql = _sql.articleClassOpt.list
            queryTotal = _sql.articleClassOpt.count
        }
        reqSqlPool.queryCount(queryTotal).then(data => {
            total = data
        })
        reqSqlPool.commonQuery(sql, params).then(data => {
            let resData = data || {}
            resData.total = total
            res.json(resData)
        })
    } catch (err) {
        next(err);
    }
}
/**
 * @date 2022-07-25
 * @Business 新建博文分类
 * @params {id, className, classValue, path, query, inertTime, updateTime}
 **/
exports.createBlogArticleClasses = async (req, res, next) => {
    try {
        let params = req.body
        console.log(params) 
        // 创建语句
        let sql = _sql.articleClassOpt.create
        // 查重语句
        let checkExisted = _sql.articleClassOpt.list + ` WHERE className='${params.className}'`
        reqSqlPool.commonQuery(checkExisted).then(data => {
            let resData = data || {}
            // 先查找是否存在类名
            if (resData.records.length > 0) {
                resData.errMsg = "类名已存在"
                resData.error = 1
                res.json(resData)
            } else {
                // 正常创建
                let createParams = [
                    tools.createRandomId(),
                    params.className,
                    params.classValue,
                    params.path,
                    params.query,
                    tools.getDate(),
                    ''
                ]
                reqSqlPool.commonQuery(sql, createParams).then(data => {
                    let resData = data || {}
                    res.json(resData)
                })
            }
        })

    } catch (err) {
        next(err)
    }
}

/**
 * @date 2022-07-25
 * @Business 修改博文分类
 * @params {id, className, classValue, path, query, inertTime, updateTime}
 **/
exports.updateBlogArticleClasses = async (req, res, next) => {
    try {
        let params = req.body
        // 修改语句
        let sql = _sql.articleClassOpt.update
        console.log(params)
        let updateParams = [
            params.className,
            params.classValue,
            params.path,
            params.query,
            params.insertTime,
            tools.getDate(),
            params.id,
        ]
        reqSqlPool.commonQuery(sql, updateParams).then(data => {
            console.log(data);
            let resData = data || {}
            res.json(resData)
        })
    } catch (err) {
        next(err)
    }
}

/**
 * @date 2022-07-25
 * @Business 删除博文分类
 * @params {id, className, classValue, path, query, inertTime, updateTime}
 **/
 exports.deleteBlogArticleClasses = async (req, res, next) => {
    try {
        let params = req.body
        // 修改语句
        let sql = _sql.articleClassOpt.delete
        console.log(params)
        let deleteParams = [
            params.id
        ]
        reqSqlPool.commonQuery(sql, deleteParams).then(data => {
            let resData = data || {}
            res.json(resData)
        })
    } catch (err) {
        next(err)
    }
}