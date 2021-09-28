const router = require('express').Router();
const multer = require('multer');

const templatesController = require('./controller');

router.get('/templates', templatesController.index);
router.post('/templates', multer().none(), templatesController.store);
router.put('/templates/:id', multer().none(), templatesController.update);
router.delete('/templates/:id', templatesController.destroy);

module.exports = router;
