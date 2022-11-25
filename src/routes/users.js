const express = require('express')
const router = express.Router()

const UserService = require('../services/UserService')
const UserController = require('../controller/UserController')
const TokenManager = require('../token/TokenManager')

const userService = new UserService()
const tokenManager = new TokenManager()
const userController = new UserController(userService, tokenManager)
const userValidator = require('../validator/UserValidator')
const verifyToken = require('../middleware/VerifyToken')

/* GET users listing. */
router.post('/auth', userController.createAuthentication)
router.use(verifyToken)
router.post('/', userValidator, userController.create)
router.get('/', userController.get)

module.exports = router
