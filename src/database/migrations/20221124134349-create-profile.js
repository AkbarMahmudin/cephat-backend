'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      umur: {
        type: Sequelize.INTEGER
      },
      jenis_kelamin: {
        type: Sequelize.ENUM(['L', 'P'])
      },
      level_aktivitas: {
        type: Sequelize.STRING
      },
      tinggi_badan: {
        type: Sequelize.DOUBLE
      },
      berat_badan: {
        type: Sequelize.DOUBLE
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('profiles')
  }
}
