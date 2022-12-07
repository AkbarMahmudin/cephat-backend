'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Makanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasMany(models.Plan, { as: 'plans', foreignKey: 'makanan_id' })
      this.hasMany(models.ConsumeHistory, { as: 'consume_histories', foreignKey: 'makanan_id' })
    }
  }
  Makanan.init({
    nama: DataTypes.STRING,
    berat: DataTypes.DOUBLE,
    kalori: DataTypes.DOUBLE,
    protein: DataTypes.DOUBLE,
    lemak: DataTypes.DOUBLE,
    karbohidrat: DataTypes.DOUBLE,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Makanan',
    tableName: 'makanan'
  })
  return Makanan
}
