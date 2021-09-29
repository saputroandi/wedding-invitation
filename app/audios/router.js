const router = require('express').Router();
const multer = require('multer');

const audiosController = require('./controller');
const { audioMiddleware } = require('./middleware');

router.get('/audios', audiosController.index);
router.post('/audios', audioMiddleware, audiosController.store);
router.put('/audios/:id', multer().none(), audiosController.update);
router.delete('/audios/:id', audiosController.destroy);

module.exports = router;
