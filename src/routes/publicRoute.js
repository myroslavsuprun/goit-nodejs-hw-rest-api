/**
 * Public router Express.js module.
 */

const express = require('express');
const path = require('path');

// **** Declarations **** //

const router = express.Router();
const publicPath = path.join(path.join(__dirname, '..', '..', 'public'));
const avatarsPath = path.join(publicPath, 'avatars');

// **** Functions **** //

router.use('/avatars', express.static(avatarsPath));

// **** Exports **** //

module.exports = router;
