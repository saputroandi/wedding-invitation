const router = require('express').Router();
const multer = require('multer');

const ordersController = require('./controller');

router.get('/', ordersController.index);
router.post('/', multer().none(), ordersController.store);
router.put('/:id', multer().none(), ordersController.update);
router.delete('/:id', ordersController.destroy);

module.exports = router;
