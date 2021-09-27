const router = require('express').Router();
const multer = require('multer');

const cardInfoController = require('./controller');

router.get('/', cardInfoController.index);
router.post('/', multer().none(), cardInfoController.store);

module.exports = router;
