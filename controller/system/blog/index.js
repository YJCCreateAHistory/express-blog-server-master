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
        let sql = ''
        let params = req.body
        if (params.id) {
            sql = _sql.articleOptions.list + ` WHERE id='${params.id}' `
        } else if (params.className) {
            sql = _sql.articleOptions.list + ` WHERE className='${params.className}'`
        } else if (params.title) {
            sql = _sql.articleOptions.list + ` WHERE title='${params.title}'`
        } else if (params.classId) {
            sql = _sql.articleOptions.list + ` WHERE classId='${params.classId}'`
        } else if (params.id && params.className && params.classId) {
            sql = _sql.articleOptions.list + ` WHERE id='${params.id}' AND className='${params.className}' AND classId='${params.classId}'`
        } else {
            sql = _sql.articleOptions.list
        }
        reqSqlPool.commonQuery(sql, params).then(data => {
            let resData = data || {}
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
        let sql = _sql.articleOptions.create
        let classSql = _sql.articleOptions.list + ` WHERE classId='${params.classId}'`
        // 拿到分类数据
        reqSqlPool.commonQuery(classSql).then(data => {
            let resClass = data || {}
            if (resClass.error) {
                resClass.json(resClass)
            } else {
                // 博文信息
                let blogParams = [
                    tools.createRandomId(),
                    resClass.records[0].id,
                    resClass.records[0].className,
                    resClass.records[0].classValue,
                    params.title, 0,
                    params.summary,
                    0, 0,
                    params.img,
                    params.content,
                    params.isTop,
                    params.isHot,
                    '',
                    tools.getDate(),
                    ' ',
                    params.catetypeId
                ]
                reqSqlPool.commonQuery(sql, blogParams).then(data=>{
                    let resData = data || {}
                    // console.log(resData)
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
                    resClass.records[0].id,
                    resClass.records[0].className,
                    resClass.records[0].classValue,
                    params.title, 
                    params.isPublish,
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
                    params.catetypeId,
                    params.id
                ]
                reqSqlPool.commonQuery(sql, blogParams).then(data=>{
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