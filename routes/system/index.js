const express = require('express')
const router = express.Router()
const webController = require('../../controller/system/login/index')
const adminRoleCon = require('../../controller/system/admin_role/index')



router.post("/xc-blog/admin/login", webController.login)
router.get("/xc-blog/admin/role", adminRoleCon.getAllAdmin)


module.exports = router
