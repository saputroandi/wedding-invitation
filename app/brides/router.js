const router = require('express').Router();
const multer = require('multer');

const bridesController = require('./controller');

router.post('/brides/:orderId', multer().none(), bridesController.store);
router.put('/brides/:orderId', multer().none(), bridesController.update);
router.delete('/brides/:orderId', bridesController.destroy);

module.exports = router;
