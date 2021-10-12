const Sequelize = require('sequelize');
const { errorHandler } = require('../utils/handler');
const Template = require('./model');
const { policyFor } = require('../utils/policy');

const index = async (req, res, next) => {
  try {
    const result = await Template.findAll();

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
    let policy = policyFor(req.user);

    if (!policy.can('create', 'Template')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses`,
      });
    }

    const payload = req.body;

    const result = await Template.create(payload);

    return res.json({
      result: result,
    });
  } catch (e) {
    console.log(e);
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

    if (!policy.can('update', 'Template')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses`,
      });
    }

    const { id } = req.params;
    const payload = req.body;

    const result = await Template.update(payload, {
      where: {
        id: id,
      },
    });

    return res.json({
      result: result,
    });
  } catch (e) {
    console.log(e);
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

    if (!policy.can('destroy', 'Template')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses`,
      });
    }

    const { id } = req.params;

    const result = await Template.destroy({ where: { id: id } });
    return res.json({
      result: result,
    });
  } catch (e) {
    console.log(e);
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
