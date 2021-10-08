const router = require('express').Router();
const multer = require('multer');

const galleryPhotosController = require('./controller');
const { galleryPhotosMiddleware } = require('./middleware');

router.get('/gallery', galleryPhotosController.index);
router.post('/audios', galleryPhotosMiddleware, galleryPhotosController.store);
router.delete('/audios/:id', galleryPhotosController.destroy);

module.exports = router;
