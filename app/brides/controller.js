const Sequelize = require('sequelize');
const Bride = require('./model');
const Order = require('../orders/model');
const { errorHandler } = require('../utils/handler');
const { policyFor } = require('../utils/policy');

const store = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);

    if (!policy.can('create', 'Bride')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses`,
      });
    }

    const { orderId } = req.params;
    const payload = req.body;

    const orderExist = await Order.findOne({ where: { id: orderId } });

    if (!orderExist) {
      return res.status(400).json({
        message: 'invalid order',
      });
    }

    const result = await Bride.create(payload);

    return res.json({
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

const update = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);

    if (!policy.can('update', 'Bride')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses`,
      });
    }

    const { orderId } = req.params;
    const payload = req.body;

    const orderExist = await Order.findOne({ where: { id: orderId } });

    if (!orderExist) {
      return res.status(400).json({
        message: 'invalid order',
      });
    }

    const result = await Bride.update(payload, {
      where: { orderId: orderId },
    });

    return res.json({
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

const destroy = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);

    if (!policy.can('destroy', 'Bride')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses`,
      });
    }

    const { orderId } = req.params;

    const result = await Bride.destroy({ where: { id: orderId } });

    return res.json({
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

module.exports = {
  store,
  update,
  destroy,
};
