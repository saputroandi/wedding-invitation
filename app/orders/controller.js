const Sequelize = require('sequelize');
const orders = require('./model');
const audios = require('../audios/model');
const templates = require('../templates/model');
const users = require('../users/model');
const { errorHandler } = require('../utils/handler');

const store = async (req, res, next) => {
  try {
    const payload = req.body;

    const audio = await audios.findOne({
      where: { id: Number(payload.audiosId) },
    });
    const template = await templates.findOne({
      where: { id: Number(payload.templatesId) },
    });

    if (!audio || !template) {
      return res.status(400).json({
        message: 'invalid audio or template',
      });
    }

    const result = await orders.create({
      ...payload,
      totalPrice: Number(payload.totalPrice),
      userId: Number(req.user.id),
      audioId: Number(payload.audiosId),
      templateId: Number(payload.templatesId),
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
};
