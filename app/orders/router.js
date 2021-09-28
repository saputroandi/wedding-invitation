const router = require('express').Router();
const multer = require('multer');

const ordersController = require('./controller');

router.get('/orders', ordersController.index);
router.post('/orders', multer().none(), ordersController.store);
router.put('/orders/:id', multer().none(), ordersController.update);
router.delete('/orders/:id', ordersController.destroy);

module.exports = router;
