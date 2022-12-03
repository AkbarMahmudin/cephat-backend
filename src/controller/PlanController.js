class PlanController {
  #service

  constructor (service) {
    this.#service = service

    this.createPlan = this.createPlan.bind(this)
    this.getAllPlanByUserId = this.getAllPlanByUserId.bind(this)
    this.updatePlanById = this.updatePlanById.bind(this)
    this.deletePlanById = this.deletePlanById.bind(this)
  }

  async createPlan (req, res, next) {
    try {
      const { makanan_id: makananId, qty, is_done: isDone } = req.body
      const { userId } = req

      await this.#service.createPlan({
        makananId, userId, qty, isDone
      })

      return res.status(201).json({
        status: 'success',
        message: 'Plan created successfully'
      })
    } catch (err) {
      next(err)
    }
  }

  async getAllPlanByUserId (req, res, next) {
    try {
      const { userId } = req
      const plans = await this.#service.getAllPlanByUserId(userId)

      // plans === 0
      if (!plans.length) {
        return res.json({
          status: 'success',
          data: []
        })
      }

      // Metadata
      const makanan = plans.map((plan) => plan.makanan.dataValues)
      const metadata = {
        count_makanan: makanan.length,
        count_berat: makanan.map((m) => m.total_berat).reduce((acc, curr) => acc + curr),
        count_kalori: makanan.map((m) => m.total_kalori).reduce((acc, curr) => acc + curr),
        count_protein: makanan.map((m) => m.total_protein).reduce((acc, curr) => acc + curr),
        count_karbohidrat: makanan.map((m) => m.total_karbohidrat).reduce((acc, curr) => acc + curr),
        count_lemak: makanan.map((m) => m.total_lemak).reduce((acc, curr) => acc + curr)
      }

      return res.json({
        status: 'success',
        data: {
          plans, metadata
        }
      })
    } catch (err) {
      next(err)
    }
  }

  async updatePlanById (req, res, next) {
    try {
      const { id: planId } = req.params
      const { qty, is_done: isDone } = req.body
      let message

      if (qty < 1) {
        // qty = 0 -> delete
        await this.#service.deletePlanById(planId)
        message = 'deleted'
      } else {
        await this.#service.updatePlanById(planId, { qty, isDone })
        message = 'updated'
      }

      res.json({
        status: 'success',
        message: `Plan ${message} successfully`
      })
    } catch (err) {
      next(err)
    }
  }

  async deletePlanById (req, res, next) {
    try {
      const { id: planId } = req.params

      await this.#service.deletePlanById(planId)

      return res.json({
        status: 'success',
        message: 'Plan deleted successfully'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = PlanController
