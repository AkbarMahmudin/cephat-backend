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

router.post('/auth', userController.createAuthentication)

router.use(verifyToken)

router.get('/', userController.get)
router.post('/', userValidator.postValidator, userController.create)
router.put('/', userValidator.putValidator, userController.update)

module.exports = router
