/**
 * Router module for api route
 */
const express = require('express');

// Routers
const contactsRouter = require('./contactsRoute');
const usersRouter = require('./usersRoute');

// Paths
const usersPaths = require('./paths/usersPaths');
const contactsPaths = require('./paths/contactsPaths');

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
