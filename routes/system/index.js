const express = require('express')
const router = express.Router()
const webController = require('../../controller/system/login/index')

router.post("/xc-blog/admin/login", webController.login)


module.exports = router
