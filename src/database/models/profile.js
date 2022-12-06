'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      this.belongsTo(models.User, { as: 'users', foreignKey: 'user_id' })
    }
  }
  Profile.init({
    umur: DataTypes.INTEGER,
    jenis_kelamin: DataTypes.ENUM(['L', 'P']),
    level_aktivitas: DataTypes.STRING,
    tinggi_badan: DataTypes.DOUBLE,
    berat_badan: DataTypes.DOUBLE,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles'
  })
  return Profile
}
