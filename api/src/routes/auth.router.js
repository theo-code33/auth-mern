const express = require('express')
const AuthController = require('../controllers/auth.controller')
const router = express.Router()

router.post('/auth/signin', AuthController.signin)
router.post('/auth/signup', AuthController.signup)
router.post('/auth/forgot-password', AuthController.forgotPassword)
router.post('/auth/reset-password', AuthController.resetPassword)

module.exports = router