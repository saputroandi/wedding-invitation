const router = require('express').Router();
const multer = require('multer');

const templatesController = require('./controller');

router.get('/', templatesController.index);
router.post('/', multer().none(), templatesController.store);
router.put('/:id', multer().none(), templatesController.update);
router.delete('/:id', templatesController.destroy);

module.exports = router;
