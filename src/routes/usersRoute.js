const express = require('express');

// const {} = require('../controllers/contactsController');

const { asyncWrapper } = require('../helpers/routeHelpers');
const {
  userRegistrationValidation,
} = require('../middlewares/usersValidationMiddleware');
const {
  userRegistrationController,
} = require('../controllers/usersController');

// const {} = require('../middlewares/validationMiddleware');

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
  asyncWrapper(userRegistrationController)
);

module.exports = { usersPaths: paths, usersRouter: router };
