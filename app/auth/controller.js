const Sequelize = require('sequelize');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../users/model');
const config = require('../config');
const { errorHandler } = require('../utils/handler');

const register = async (req, res, next) => {
  try {
    const payload = req.body;

    const result = await User.create(payload);

    res.json({
      result: result,
    });
  } catch (e) {
    if (e instanceof Sequelize.ValidationError) {
      const errorMessages = errorHandler(e);
      return res.status(400).json({
        error: 1,
        messages: errorMessages,
      });
    }
    next(e);
  }
};

async function localStrategy(email, password, done) {
  try {
    const userData = await User.findOne({ where: { email: email } });
    if (!userData) return done();
    if (bcrypt.compareSync(password, userData.dataValues.password)) {
      return done(null, userData);
    }
  } catch (err) {
    done(err, null);
  }
  done();
}

const login = async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
    if (err) return next(err);
    if (!user)
      return res.json({ error: 1, result: 'email or password incorrect' });

    let signed = jwt.sign(user.dataValues, config.secretKey);

    const { password, createdAt, updatedAt, ...resultMessage } =
      user.dataValues;

    return res.json({
      message: 'logged in successfully',
      user: resultMessage,
      token: signed,
    });
  })(req, res, next);
};

function me(req, res, next) {
  if (!req.user) {
    return res.json({
      error: 1,
      message: `Your're not login or token expired`,
    });
  }

  const { password, createdAt, updatedAt, ...userResponse } = req.user;

  return res.json(userResponse);
}

module.exports = {
  register,
  localStrategy,
  login,
  me,
};
