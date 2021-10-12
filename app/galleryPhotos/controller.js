const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const GalleryPhoto = require('./model');
const config = require('../config');
const { errorHandler } = require('../utils/handler');
const { policyFor } = require('../utils/policy');

const index = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const result = await GalleryPhoto.findAll({ where: { orderId: orderId } });

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
    let photosPayload = req.files;
    let { orderId } = req.params;

    let arrFileName = photosPayload.map((photo, idx) => {
      return photo.filename;
    });

    let arrTmpPath = photosPayload.map((photo, idx) => {
      return photo.path;
    });

    let arrTargetPath = arrFileName.map((fileName, idx) => {
      return path.resolve(
        config.rootPath,
        `public/uploads/photos/gallery/${fileName}`
      );
    });

    for (let i = 0; i < photosPayload.length; i++) {
      let source = fs.createReadStream(arrTmpPath[i]);
      let destination = fs.createWriteStream(arrTargetPath[i]);

      source.pipe(destination);

      source.on('end', async () => {
        let { dataValues } = await GalleryPhoto.create({
          name: arrFileName[i],
          orderId: orderId,
        });
      });

      source.on('error', async (err) => {
        next(err);
      });
    }

    return res.json({
      result: photosPayload.length,
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

    const galleryPhotoData = await GalleryPhoto.findOne({ where: { id: id } });

    if (galleryPhotoData) {
      const file = galleryPhotoData.dataValues.name;

      const filePath = path.resolve(
        config.rootPath,
        `public/uploads/photos/gallery/${file}`
      );

      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(400).json({
            messages: err,
          });
        }
        // console.log(`${file} was deleted`);
      });

      const result = await GalleryPhoto.destroy({ where: { id: id } });

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

module.exports = { index, store, destroy };
