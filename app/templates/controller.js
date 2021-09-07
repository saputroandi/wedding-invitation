const { errorHandler } = require('../utils/handler');
const templates = require('./model');

const index = async (req, res, next) => {
  try {
    // const { id = '' } = req.query;
    // console.log(id.length);
    // if (id.length) console.log('hit');
    const result = await templates.findAll();

    return res.json({
      result: result,
      // id: id,
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

const store = async (req, res, next) => {
  try {
    const payload = req.body;

    const result = await templates.create(payload);

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
    const { id } = req.params;
    const payload = req.body;

    const result = await templates.update(payload, {
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
    const { id } = req.params;

    const result = await templates.destroy({ where: { id: id } });
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
