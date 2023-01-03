const express = require('express');

const {
  userRegistrationController,
} = require('../controllers/usersController');

const { userRegistrationSchema } = require('../utils/userSchema');

const {
  validationBySchemaMiddleware,
} = require('../middlewares/validationMiddlewares');

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
  validationBySchemaMiddleware(userRegistrationSchema, 'body'),
  userRegistrationController
);

module.exports = { usersPaths: paths, usersRouter: router };
