const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const audios = sequelize.define(
  'audios',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [6, 16],
      },
    },
    role: {
      type: DataTypes.ENUM(['user', 'admin']),
      defaultValue: 'user',
    },
  },
  {
    // Other model options go here
  }
);

module.exports = audios;
