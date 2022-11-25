'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('makanan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false
      },
      berat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      kalori: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      protein: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      lemak: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      karbohidrat: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      image: {
        type: Sequelize.TEXT,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('makanan')
  }
}
