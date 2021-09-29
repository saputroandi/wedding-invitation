const os = require('os');
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

const audioMiddleware = (req, res, next) => {
  // temporary destination for storing file
  const upload = multer({ storage: storage }).array('audiosName', 5);

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
