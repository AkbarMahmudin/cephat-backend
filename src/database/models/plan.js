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
  return Plan
}
