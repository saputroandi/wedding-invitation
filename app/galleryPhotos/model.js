const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const galleryPhotos = sequelize.define(
  'galleryPhotos',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = galleryPhotos;
