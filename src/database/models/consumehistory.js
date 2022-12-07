'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ConsumeHistory extends Model {
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
  ConsumeHistory.init({
    user_id: DataTypes.INTEGER,
    makanan_id: DataTypes.INTEGER,
    plan_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    total_berat: DataTypes.DOUBLE,
    total_kalori: DataTypes.DOUBLE,
    total_protein: DataTypes.DOUBLE,
    total_karbohidrat: DataTypes.DOUBLE,
    total_lemak: DataTypes.DOUBLE,
    tgl_konsumsi: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ConsumeHistory',
    tableName: 'consume_histories'
  })
  return ConsumeHistory
}
