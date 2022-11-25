const express = require('express')
const router = express.Router()

const MakananService = require('../services/MakananService')
const MakananController = require('../controller/MakananController')

const makananService = new MakananService()
const makananController = new MakananController(makananService)
const verifyToken = require('../middleware/VerifyToken')

router.use(verifyToken)
router.get('/', makananController.getAll)

module.exports = router
