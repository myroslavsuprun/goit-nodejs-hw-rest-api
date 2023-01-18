const express = require('express');

// Paths
const { usersPaths: paths } = require('./paths');

// Controllers
const {
  userRegistrationController,
  userLoginController,
  userLogoutController,
  userCurrentController,
  userSubscriptionUpdateController,
  userAvatarUpdateController,
  userVerificationController,
  userVerificationResendController,
} = require('../controllers/users');

// Middlewares
const {
  uploadAvatarMiddleware,
  validationBySchemaMiddleware,
  authMiddleware,
} = require('../middlewares');

// Schemas
const {
  userSchema,
  userSubscriptionUpdateSchema,
  userVerificationIdSchema,
  userVerificationResendSchema,
} = require('../utils');

// **** Variables **** //

/**
 * Auth Router module for users path.
 */
const router = express.Router();

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
  uploadAvatarMiddleware,
  userAvatarUpdateController
);

router.get(
  paths.verifyByToken,
  validationBySchemaMiddleware(userVerificationIdSchema, 'params'),
  userVerificationController
);

router.post(
  paths.verify,
  validationBySchemaMiddleware(userVerificationResendSchema, 'body'),
  userVerificationResendController
);

// **** Export **** //

module.exports = router;
