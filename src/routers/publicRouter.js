/**
 * Public router Express.js module.
 */

const express = require('express');
const path = require('path');

const { publicPaths: paths } = require('./paths');

// **** Declarations **** //

const router = express.Router();
const publicPath = path.join(path.join(__dirname, '..', '..', 'public'));
const avatarsPath = path.join(publicPath, 'avatars');

// **** Functions **** //

router.use(paths.avatars, express.static(avatarsPath));

// **** Exports **** //

module.exports = router;
