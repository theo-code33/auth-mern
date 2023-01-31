const express = require('express')
const UserController = require('../controllers/user.controller')
const TokenMiddleware = require('../middlewares/token.middleware')
const router = express.Router()

router.put('/user/update', TokenMiddleware, UserController.updateProfile)

module.exports = router