const os = require('os');
const multer = require('multer');
const path = require('path');

// keep original name
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, os.tmpdir());
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const audioMiddleware = (req, res, next) => {
  // temporary destination for storing file
  const upload = multer({
    storage: storage,
    limits: 5,
    fileFilter: function (req, file, cb) {
      const filetypes = /mp3|mpeg/;

      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      const mimetype = filetypes.test(file.mimetype);

      if (!mimetype || !extname) {
        return cb(new multer.MulterError('Only mp3 or mpeg are allowed'));
      }
      cb(null, true);
    },
  }).array('audiosName', 5);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ error: 1, messages: err });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({ error: 1, messages: err });
    }
    // Everything went fine.
    next();
  });
};

module.exports = {
  audioMiddleware,
};
