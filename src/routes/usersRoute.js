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
} = require('../controllers/usersController');

// Middlewares
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

// **** Export **** //

module.exports = { usersRouter: router };
