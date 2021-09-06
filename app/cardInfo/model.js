const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const cardInfo = sequelize.define(
  'cardInfo',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    quotes: {
      type: DataTypes.TEXT,
    },
    story: {
      type: DataTypes.TEXT,
    },
    date: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.TEXT,
    },
    healtProtocol: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = cardInfo;
