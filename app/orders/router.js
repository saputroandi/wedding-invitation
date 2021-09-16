const router = require('express').Router();
const multer = require('multer');

const ordersController = require('./controller');

router.post('/', multer().none(), ordersController.store);

module.exports = router;
