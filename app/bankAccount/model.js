const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const BankAccount = sequelize.define(
  'bankAccounts',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    accountOwner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
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

module.exports = BankAccount;
