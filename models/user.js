'use strict';
const { Model } = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      // define association here
    }

    toJSON() {
      return  {...this.get(), id: undefined, password: undefined }
    }

    async generateToken() {
      const secret = process.env.JWT_SECRET || 'jsonwebtoken';
      const token = await jwt.sign(this.toJSON(), secret);
      return token;
    }
  }

  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: { msg: 'Name cannot be empty.' },
          len: { args: [3, 255], msg: 'Name can only have 3 to 255 characters.' }
        }
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: { msg: 'Email cannot be empty.' },
          isEmail: { msg: 'Email must be valid.' }
        }
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: { msg: 'Password cannot be empty.' },
          len: { args: [3, 255], msg: 'Password can only have 3 to 255 characters.' }
        }
      },

    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
