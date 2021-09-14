const jwt = require('jsonwebtoken');

const config = require('../config');
const { getToken } = require('../utils/get-token');

const decodeToken = () => {
  return async function (req, res, next) {
    try {
      let token = getToken(req);

      if (!token) return next();

      req.user = jwt.verify(token, config.secretKey);
    } catch (err) {
      if (err && err.name === 'JsonWebTokenError') {
        return res.json({
          error: 1,
          message: err.message,
        });
      }
      next(err);
    }
    return next();
  };
};

module.exports = {
  decodeToken,
};
