const os = require('os');
const router = require('express').Router();
const multer = require('multer');

// keep original name
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, os.tmpdir());
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// temporary destination for storing file
const upload = multer({ storage: storage });

const audiosController = require('./controller');

router.get('/audios', audiosController.index);
router.post('/audios', upload.array('audiosName', 5), audiosController.store);
router.put('/audios/:id', multer().none(), audiosController.update);
router.delete('/audios/:id', audiosController.destroy);

module.exports = router;
