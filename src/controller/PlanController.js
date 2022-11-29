class PlanController {
  #service

  constructor (service) {
    this.#service = service

    this.createPlan = this.createPlan.bind(this)
    this.getAllPlanByUserId = this.getAllPlanByUserId.bind(this)
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
}

module.exports = PlanController
