'use strict'

const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.hasOne(models.Profile, { as: 'profiles', foreignKey: 'user_id' })
      this.hasMany(models.Plan, { as: 'plans', foreignKey: 'user_id' })
      this.hasOne(models.NutritionProfile, { as: 'nutrition_profiles', foreignKey: 'user_id' })
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  })
  return User
}
