const { User } = require('../db/userModel');

/**
 * Adding a new user to the database
 *
 * @param {object} credentials - object which contains encrypted password and email
 * @returns created user from the DB
 */
const addUser = async credentials => {
  const { email, subscription } = await User.create(credentials);
  return { email, subscription };
};

module.exports = { addUser };
