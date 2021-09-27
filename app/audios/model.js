const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Audio = sequelize.define(
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
      unique: true,
    },
  },
  {
    // Other model options go here
    underscored: true,
  }
);

module.exports = Audio;
