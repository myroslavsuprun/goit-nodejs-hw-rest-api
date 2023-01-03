const bcrypt = require('bcrypt');

const { addUser, getUser } = require('../services/usersService');
const { ConflictError } = require('../helpers/errorHelpers');

const userRegistrationController = async (req, res) => {
  const { password, email } = req.body;

  /**
   * Check whether the provided email is already taken.
   */
  const userCheckup = await getUser({ email });

  if (userCheckup) {
    throw new ConflictError('The email is already taken.');
  }

  /**
   * Encrypt the provided password.
   */
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  /**
   * Save the newly created user to the DB.
   */
  const createdUser = await addUser({ password: encryptedPassword, email });

  res.json(createdUser);
};

module.exports = { userRegistrationController };
