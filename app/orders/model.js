const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define(
  'orders',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    totalPrice: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: 0,
    },
    paymentStatus: {
      type: DataTypes.ENUM(['paid', 'fail', 'pending', 'not paid']),
      defaultValue: 'not paid',
    },
    slug: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    templateId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    audioId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    underscored: true,
  }
);

module.exports = Order;
