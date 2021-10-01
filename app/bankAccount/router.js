const router = require('express').Router();
const multer = require('multer');

const bankAccountController = require('./controller');

router.post(
  '/bank-account/:orderId',
  multer().none(),
  bankAccountController.store
);
router.put(
  '/bank-account/:orderId',
  multer().none(),
  bankAccountController.updateOne
);
router.delete(
  '/bank-account/:orderId',
  multer().none(),
  bankAccountController.destroyOne
);

module.exports = router;
