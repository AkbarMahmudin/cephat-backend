const express = require('express')
const router = express.Router()

const PlanService = require('../services/PlanService')
const PlanController = require('../controller/PlanController')

const planService = new PlanService()
const planController = new PlanController(planService)

const verifyToken = require('../middleware/VerifyToken')

router.use(verifyToken)
router.get('/', planController.getAllPlanByUserId)
router.post('/', planController.createPlan)

module.exports = router
