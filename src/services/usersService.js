const { User } = require('../db/userModel');

/**
 * Adding a new user to the database
 *
 * @param {object} credentials - object which contains encrypted password and email
 * @returns created user from the DB
 */
const addUser = async credentials => {
  return await User.create(credentials);
};

module.exports = { addUser };
