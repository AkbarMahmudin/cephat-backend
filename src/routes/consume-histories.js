const express = require('express')
const router = express.Router()

const ConsumeHistoryService = require('../services/ConsumeHistoryService')
const ConsumeHistoryController = require('../controller/ConsumeHistoryController')

const consumeHistoryService = new ConsumeHistoryService()
const consumeHistoryController = new ConsumeHistoryController(consumeHistoryService)
const verifyToken = require('../middleware/VerifyToken')

router.use(verifyToken)
router.get('/', consumeHistoryController.getAllHistory)
router.post('/', consumeHistoryController.createHistory)

module.exports = router
