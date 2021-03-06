const { DataTypes, ValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../utils/database');

const HASH_ROUND = 10;

const User = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        async uniqueEmails(email) {
          const userMail = await User.findOne({ where: { email: email } });
          if (userMail) throw new ValidationError('email has been taken');
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 16],
      },
    },
    role: {
      type: DataTypes.ENUM(['user', 'admin']),
      defaultValue: 'user',
    },
  },
  {
    // Other model options go here
    underscored: true,
    hooks: {
      beforeCreate(user, options) {
        user.password = bcrypt.hashSync(user.password, HASH_ROUND);
      },
      afterCreate(response) {
        delete response.dataValues.password;
        delete response.dataValues.updatedAt;
        delete response.dataValues.createdAt;
      },
    },
  }
);

module.exports = User;
