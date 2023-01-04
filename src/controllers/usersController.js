const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { addUser, getUser, updateUser } = require('../services/usersService');
const {
  ConflictError,
  NotAuthorizedError,
} = require('../helpers/errorHelpers');

// TODO: Move all the logic to services, not in controllers
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

  /**
   * Response with the created user
   */
  res.json(createdUser);
};

const userLoginController = async (req, res) => {
  const { password, email } = req.body;

  const user = await getUser({ email });

  if (!user) {
    throw new NotAuthorizedError('The email or password is incorrect.');
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('The email or password is incorrect.');
  }

  const payload = {
    email,
    id: user.id,
  };

  const token = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  await updateUser({ email }, { token });

  const responseData = {
    id: user.id,
    email,
    subscription: user.subscription,
    token,
  };

  res.json(responseData);
};

module.exports = { userRegistrationController, userLoginController };
