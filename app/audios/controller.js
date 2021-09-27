const os = require('os');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const multer = require('multer');

const { errorHandler } = require('../utils/handler');
const Audio = require('./model');
const config = require('../config');

const index = async (req, res, next) => {
  try {
    const result = await Audio.findAll();

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
    let audiosPayload = req.files;

    let arrFileName = audiosPayload.map((audio, idx) => {
      return audio.filename;
    });

    let arrTmpPath = audiosPayload.map((audio, idx) => {
      return audio.path;
    });

    let arrTargetPath = arrFileName.map((fileName, idx) => {
      return path.resolve(config.rootPath, `public/uploads/audio/${fileName}`);
    });

    for (let i = 0; i < audiosPayload.length; i++) {
      let source = fs.createReadStream(arrTmpPath[i]);
      let destionation = fs.createWriteStream(arrTargetPath[i]);

      source.pipe(destionation);

      source.on('end', async () => {
        let { dataValues } = await Audio.create({
          audiosName: arrFileName[i],
        });
      });

      source.on('error', async (err) => {
        next(err);
      });
    }

    return res.json({
      result: audiosPayload.length,
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

    const audioData = await Audio.findOne({ where: { id: id } });

    if (audioData) {
      const oldName = audioData.dataValues.audiosName;
      const getExtension = oldName.split('.')[oldName.split('.').length - 1];

      const newName = payload.audiosName + '.' + getExtension;

      const oldPath = path.resolve(
        config.rootPath,
        `public/uploads/audio/${oldName}`
      );
      const newPath = path.resolve(
        config.rootPath,
        `public/uploads/audio/${newName}`
      );

      if (fs.existsSync(newPath)) {
        return res.status(400).json({
          messages: 'File name already used',
        });
      }

      // rename file
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
      });

      // update table
      const result = await Audio.update(
        {
          audiosName: newName,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.json({
        result: result,
      });
    }

    return res.status(400).json({
      messages: 'File not exists',
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

    const audioData = await Audio.findOne({ where: { id: id } });

    if (audioData) {
      const file = audioData.dataValues.audiosName;

      const filePath = path.resolve(
        config.rootPath,
        `public/uploads/audio/${file}`
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(400).json({
            messages: err,
          });
        }
        console.log(`${file} was deleted`);
      });

      const result = await Audio.destroy({ where: { id: id } });

      return res.json({
        result: result,
      });
    }

    return res.status(400).json({
      messages: 'File not exists',
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
