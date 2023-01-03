const express = require('express');

const {
  userRegistrationController,
} = require('../controllers/usersController');

const {
  userRegistrationValidation,
} = require('../middlewares/usersValidationMiddleware');

/**
 * Auth router middleware module
 */

// **** Variables **** //

const paths = {
  base: '/users',
  registration: '/signup',
};

const router = express.Router();

// **** Functions **** //

router.post(
  paths.registration,
  userRegistrationValidation,
  userRegistrationController
);

module.exports = { usersPaths: paths, usersRouter: router };
