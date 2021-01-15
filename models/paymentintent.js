'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentIntent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PaymentIntent.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    paymentIntendId: {
      type: DataTypes.STRING,
      allowNull: false
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },

    stripeResponse: {
      type: DataTypes.TEXT,
      allowNull: true
    },

  }, {
    sequelize,
    modelName: 'PaymentIntent',
    tableName: 'paymentIntents'
  });
  return PaymentIntent;
};