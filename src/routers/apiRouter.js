/**
 * Router module for api route
 */
const express = require('express');

// Routers
const contactsRouter = require('./contactsRouter');
const usersRouter = require('./usersRouter');

// Paths
const { usersPaths, contactsPaths } = require('./paths');

// **** Variables **** //
/**
 * Router module for "api" path
 */
const router = express.Router();

// **** Middlewares **** //
router.use(contactsPaths.base, contactsRouter);
router.use(usersPaths.base, usersRouter);

// **** Export **** //

module.exports = router;
