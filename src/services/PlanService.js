const { Plan, Makanan } = require('../database/models')
const { Sequelize } = require('sequelize')
const NotFoundError = require('../exceptions/NotFoundError')

class PlanService {
  #model

  constructor () {
    this.#model = Plan

    this.createPlan = this.createPlan.bind(this)
    this.getAllPlanByUserId = this.getAllPlanByUserId.bind(this)
    this.updatePlanById = this.updatePlanById.bind(this)
    this.deletePlanById = this.deletePlanById.bind(this)
  }

  async createPlan ({ makananId, userId, qty = 1, isDone = false }) {
    const newPlan = await this.#model.create({
      makanan_id: makananId,
      user_id: userId,
      qty,
      is_done: isDone
    })

    return newPlan
  }

  async getAllPlanByUserId (userId) {
    // Atribut total
    const totalAttribute = [
      [Sequelize.literal(`${Sequelize.col('qty').col}*${Sequelize.col('makanan.berat').col}`), 'total_berat'],
      [Sequelize.literal(`${Sequelize.col('qty').col}*${Sequelize.col('makanan.kalori').col}`), 'total_kalori'],
      [Sequelize.literal(`${Sequelize.col('qty').col}*${Sequelize.col('makanan.protein').col}`), 'total_protein'],
      [Sequelize.literal(`${Sequelize.col('qty').col}*${Sequelize.col('makanan.lemak').col}`), 'total_lemak'],
      [Sequelize.literal(`${Sequelize.col('qty').col}*${Sequelize.col('makanan.karbohidrat').col}`), 'total_karbohidrat']
    ]

    const plans = await this.#model.findAll({
      attributes: {
        exclude: ['user_id', 'makanan_id', 'createdAt', 'updatedAt']
      },
      where: {
        user_id: userId,
        is_done: false
      },
      include: [{
        model: Makanan,
        as: 'makanan',
        attributes: [
          'id', 'nama', 'image', ...totalAttribute // <- include custom columns
        ]
      }]
    })

    if (!plans.length) {
      return []
    }

    return plans
  }

  async updatePlanById (planId, { qty, isDone }) {
    const plan = await this.#model.findByPk(planId)
    if (!plan) {
      throw new NotFoundError('Plan not found')
    }

    const data = {
      ...(qty) && ({ qty }),
      ...(isDone) && ({ is_done: isDone })
    }

    await plan.update(data)

    return plan
  }

  async deletePlanById (planId) {
    const plan = await this.#model.findByPk(planId)
    if (!plan) {
      throw new NotFoundError('Plan not found')
    }

    await plan.destroy()

    return true
  }
}

module.exports = PlanService
