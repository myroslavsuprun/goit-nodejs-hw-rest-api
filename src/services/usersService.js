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

/**
 * Search for one user in the DB with the provided credentials query.
 *
 * @param {object} credentials
 * @returns found user from the DB or null
 */
const getUser = async credentials => {
  const user = await User.findOne({ ...credentials });
  return user;
};

module.exports = { addUser, getUser };
