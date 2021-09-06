const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const alsoInvite = sequelize.define(
  'alsoInvite',
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
  },
  {
    // Other model options go here
  }
);

module.exports = alsoInvite;
