const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const CardInfo = sequelize.define(
  'cardInfos',
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
    orderId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    underscored: true,
  }
);

module.exports = CardInfo;
