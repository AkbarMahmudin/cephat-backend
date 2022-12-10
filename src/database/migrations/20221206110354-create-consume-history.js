'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('consume_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      makanan_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'makanan',
          key: 'id'
        }
      },
      plan_id: {
        type: Sequelize.INTEGER
      },
      qty: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_berat: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      total_kalori: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      total_protein: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      total_karbohidrat: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      total_lemak: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      tgl_konsumsi: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
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
    await queryInterface.dropTable('consume_histories')
  }
}
