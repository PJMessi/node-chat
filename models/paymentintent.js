'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentIntent extends Model {
    
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  PaymentIntent.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      paymentIntentId: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      stripeResponse: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'PaymentIntent',
      tableName: 'paymentIntents',
    }
  );
  return PaymentIntent;
};
