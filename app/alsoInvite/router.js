const router = require('express').Router();
const multer = require('multer');

const alsoInviteController = require('./controller');

router.post(
  '/also-invite/:orderId',
  multer().none(),
  alsoInviteController.store
);
router.put(
  '/also-invite/:orderId',
  multer().none(),
  alsoInviteController.updateOne
);
router.delete(
  '/also-invite/:orderId',
  multer().none(),
  alsoInviteController.destroyOne
);

module.exports = router;
