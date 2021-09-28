const router = require('express').Router();
const multer = require('multer');

const cardInfoController = require('./controller');

router.post('/card-info/:orderId', multer().none(), cardInfoController.store);
router.put('/card-info/:orderId', multer().none(), cardInfoController.update);
router.delete('/card-info/:orderId', cardInfoController.destroy);

module.exports = router;
