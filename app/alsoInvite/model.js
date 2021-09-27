const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const AlsoInvite = sequelize.define(
  'alsoInvites',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    guestName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
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

module.exports = AlsoInvite;
