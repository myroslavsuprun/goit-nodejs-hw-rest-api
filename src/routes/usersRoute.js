const express = require('express');

// Paths
const paths = require('./paths/usersPaths');

// Controllers
const {
  userRegistrationController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionUpdateController,
  userAvatarUpdateController,
} = require('../controllers/users');

// Middlewares
const multer = require('multer');
const {
  validationBySchemaMiddleware,
} = require('../middlewares/validationMiddlewares');
const authMiddleware = require('../middlewares/authMiddleware');

// Schemas
const {
  userSchema,
  userSubscriptionUpdateSchema,
} = require('../utils/userSchema');

// **** Variables **** //
/**
 * Auth Router module for users path.
 */
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// **** Functions **** //

router.patch(
  paths.main,
  authMiddleware,
  validationBySchemaMiddleware(userSubscriptionUpdateSchema, 'body'),
  userSubscriptionUpdateController
);

router.post(
  paths.registration,
  validationBySchemaMiddleware(userSchema, 'body'),
  userRegistrationController
);

router.post(
  paths.login,
  validationBySchemaMiddleware(userSchema, 'body'),
  userLoginController
);

router.get(paths.logout, authMiddleware, userLogoutController);

router.get(paths.current, authMiddleware, userCurrentController);

router.post(
  paths.avatars,
  authMiddleware,
  upload.single('avatar'),
  userAvatarUpdateController
);

// **** Export **** //

module.exports = router;
