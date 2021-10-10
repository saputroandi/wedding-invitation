const os = require('os');
const path = require('path');
const multer = require('multer');

// keep original name
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, os.tmpdir());
  },
  filename: function (req, file, callback) {
    if (req && 'user' in req) callback(null, `${req.user.id}_${Date.now()}`);
    callback(null, file.originalname);
  },
});

const galleryPhotosMiddleware = (req, res, next) => {
  // temporary destination for storing file
  const upload = multer({
    storage: storage,
    limits: { files: 8, fileSize: 4000000 },
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png|gif/;

      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      const mimetype = filetypes.test(file.mimetype);

      if (!mimetype || !extname) {
        return cb(new multer.MulterError('Only images are allowed'));
      }
      cb(null, true);
    },
  }).array('galleryPhotosName', 8);

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
  galleryPhotosMiddleware,
};
