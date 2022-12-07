'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class NutritionProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' })
    }
  }
  NutritionProfile.init({
    kalori: DataTypes.DOUBLE,
    protein: DataTypes.JSON,
    karbohidrat: DataTypes.JSON,
    lemak: DataTypes.JSON,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NutritionProfile',
    tableName: 'nutrition_profiles'
  })
  return NutritionProfile
}
