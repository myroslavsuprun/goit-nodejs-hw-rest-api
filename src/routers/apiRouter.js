/**
 * Router module for api route
 */
const express = require('express');

// Routers
const { contactsRouter, usersRouter } = require('./');

// Paths
const { usersPaths, contactsPaths } = require('./paths');

// **** Variables **** //
/**
 * Router module for "api" path
 */
const router = express.Router();

// **** Middlewares **** //

router.use(usersPaths.base, usersRouter);
router.use(contactsPaths.base, contactsRouter);

// **** Export **** //

module.exports = router;
