const express = require('express');

// Paths
const paths = require('./paths/usersPaths');

// Controllers
const {
  userRegistrationController,
} = require('../controllers/usersController');

// Middlewares
const {
  validationBySchemaMiddleware,
} = require('../middlewares/validationMiddlewares');

// Schemas
const { userRegistrationSchema } = require('../utils/userSchema');

/**
 * Auth router middleware module
 */

// **** Variables **** //

const router = express.Router();

// **** Functions **** //

router.post(
  paths.registration,
  validationBySchemaMiddleware(userRegistrationSchema, 'body'),
  userRegistrationController
);

// **** Export **** //

module.exports = { usersRouter: router };
