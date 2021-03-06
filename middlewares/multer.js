const multer = require('multer');
const path = require('path');

const checkFileType = (file, callback) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return callback(null, true);
  } else {
    callback('error: image only!');
  }
};

const storage = multer.diskStorage({
  destination: 'public/img',
  filename: function(req, file, callback) {
    callback(null, 'user-' + Date.now() + path.extname(file.originalname));
  },
});

const uploadSingle = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function(req, file, callback) {
    checkFileType(file, callback);
  },
}).single('image');

module.exports = {
  uploadSingle,
};
