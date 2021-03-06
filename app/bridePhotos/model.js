const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const BridePhoto = sequelize.define(
  'bridePhotos',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    mansPhoto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    womansPhoto: {
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

module.exports = BridePhoto;
