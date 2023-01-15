const multer = require('multer');
const path = require('path');

// **** Declarations **** //

const uploadDir = path.join(process.cwd(), 'tmp');

const storage = multer.diskStorage({
  // Setting saving destination.
  destination: function (_, __, cb) {
    cb(null, uploadDir);
  },

  // Setting new file name for saving.
  filename: function (req, file, cb) {
    const [, fileExtension] = file.originalname.split('.');
    const userId = req.user.id;

    cb(null, `${userId}.${fileExtension}`);
  },
});

// **** Middleware **** //

const uploadAvatarMiddleware = multer({ storage }).single('avatar');

// **** Exports **** //

module.exports = { uploadAvatarMiddleware };
