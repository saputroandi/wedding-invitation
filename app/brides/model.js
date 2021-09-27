const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Bride = sequelize.define(
  'brides',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    mansName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    womansName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mansNickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    womansNickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mansOrderCome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    womansOrderCome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mansMothersName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    womansMothersName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mansFathersName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    womansFathersName: {
      type: DataTypes.STRING,
      allowNull: false,
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

module.exports = Bride;
