const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Template = sequelize.define(
  'templates',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    templatesName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
  },
  {
    // Other model options go here
    underscored: true,
  }
);

module.exports = Template;
