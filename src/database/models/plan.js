'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' })
      this.belongsTo(models.Makanan, { as: 'makanan', foreignKey: 'makanan_id' })
    }
  }
  Plan.init({
    makanan_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Plan',
    tableName: 'plans'
  })

  Plan.addHook('afterUpdate', async (plan) => {
    const { id: planId, user_id: userId, makanan_id: makananId, qty } = plan
    const makanan = await sequelize.models.Makanan.findByPk(makananId)
    const history = await sequelize.models.ConsumeHistory.findOne({
      where: {
        plan_id: planId
      }
    })

    // Status is done
    if (plan.is_done && !history) {
      await sequelize.models.ConsumeHistory.create({
        user_id: userId,
        makanan_id: makananId,
        plan_id: planId,
        qty,
        total_berat: makanan.berat * qty,
        total_kalori: makanan.kalori * qty,
        total_protein: makanan.protein * qty,
        total_karbohidrat: makanan.karbohidrat * qty,
        total_lemak: makanan.lemak * qty
      })
    } else if (!plan.is_done && history) {
      await history.destroy()
    }
  })
  return Plan
}
