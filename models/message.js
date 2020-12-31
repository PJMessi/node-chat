'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Message extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
    }

    toJSON() {
      return  {...this.get(), id: undefined, userId: undefined }
    }
  }

  Message.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: 'Content cannot be empty.' },
          len: { args: [1, 255], msg: 'Content can only have 1 to 255 characters.' }
        }
      },
    },
    {
      sequelize,
      tableName: 'messages',
      modelName: 'Message',
    }
  );
  return Message;
};
