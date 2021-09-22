const Sequelize = require('sequelize');
const orders = require('./model');
const audios = require('../audios/model');
const templates = require('../templates/model');
const users = require('../users/model');
const { errorHandler } = require('../utils/handler');

const index = async (req, res, next) => {
  try {
    const result = await orders.findAll();

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

const store = async (req, res, next) => {
  try {
    const payload = req.body;
    const user = req.user;

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
      userId: Number(user.id),
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

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const user = req.user;

    // need to add casl for handling other user try to update orders of other user

    const result = await orders.update(payload, { where: { id: id } });

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
    const { id } = req.params;

    // add casl for blocking user delete other orders of onother user

    const result = await orders.destroy({ where: { id: id } });

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
  index,
  store,
  update,
  destroy,
};
