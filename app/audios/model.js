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
    audiosName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = audios;
