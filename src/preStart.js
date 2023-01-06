/**
 * Pre-start is where we want to place things that must run before the express
 * server is started.
 */

const dotenv = require('dotenv');
const path = require('path');

// **** Setup command line options **** //

// // **** Set the env file **** //

const result2 = dotenv.config({
  path: path.join(__dirname, `../development.env`),
});

if (result2.error) {
  throw result2.error;
}
