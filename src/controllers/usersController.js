const { NotFoundError } = require('../helpers/errorHelpers');
const AuthService = require('../services/authService');

const userRegistrationController = async (req, res) => {
  const user = await AuthService.createUser(req.body);

  const { email, subscription } = user;
  res.json({ email, subscription });
};

const userLoginController = async (req, res) => {
  const user = await AuthService.loginUser(req.body);

  const { email, subscription, token } = user;

  res.json({ email, subscription, token });
};

const userLogoutController = async (req, res) => {
  // Extracting id which was passed through auth Middleware
  const id = req.user.id;

  // Removing user's token from the DB
  await AuthService.logoutUser(id);

  res.sendStatus(204);
};

const userCurrentController = async (req, res) => {
  // Extracting id which was passed through auth Middleware
  const id = req.user.id;

  const user = await AuthService.getUserById(id);

  if (!user) {
    throw new NotFoundError('User has not been found.');
  }

  const { email, subscription } = user;

  res.json({ email, subscription });
};

module.exports = {
  userRegistrationController,
  userLoginController,
  userLogoutController,
  userCurrentController,
};
