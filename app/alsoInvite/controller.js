const Sequelize = require('sequelize');
const AlsoInvite = require('./model');
const Order = require('../orders/model');
const { errorHandler } = require('../utils/handler');

const store = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const payload = req.body;

    const orderExist = await Order.findOne({ where: { id: orderId } });

    if (!orderExist) {
      return res.status(400).json({
        message: 'invalid order',
      });
    }

    const result = await AlsoInvite.bulkCreate(payload, { validate: true });

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

const updateOne = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { inviteId, ...payload } = req.body;

    const orderExist = await Order.findOne({ where: { id: orderId } });

    if (!orderExist) {
      return res.status(400).json({
        message: 'invalid order',
      });
    }

    const result = await AlsoInvite.update(payload, {
      where: { id: inviteId },
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

const destroyOne = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { inviteId, ...payload } = req.body;

    const orderExist = await Order.findOne({ where: { id: orderId } });

    if (!orderExist) {
      return res.status(400).json({
        message: 'invalid order',
      });
    }

    const result = await AlsoInvite.destroy({
      where: { id: inviteId },
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

module.exports = {
  store,
  updateOne,
  destroyOne,
};
