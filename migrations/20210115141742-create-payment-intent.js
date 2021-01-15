'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('paymentIntents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },

      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: true
      },

      paymentIntentId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      amount: {
        type: Sequelize.DataTypes.DECIMAL(10,2),
        allowNull: false
      },

      currency: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },

      paymentMethod: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },

      stripeResponse: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('paymentIntents');
  }
};