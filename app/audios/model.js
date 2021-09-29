const { DataTypes, ValidationError } = require('sequelize');
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
      validate: {
        async uniqueName(audiosName) {
          const audioData = await Audio.findOne({
            where: { audiosName: audiosName },
          });
          if (audioData) throw new ValidationError('audiosName has been taken');
        },
      },
    },
  },
  {
    // Other model options go here
    underscored: true,
  }
);

module.exports = Audio;
