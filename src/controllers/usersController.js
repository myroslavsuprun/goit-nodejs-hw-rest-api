const AuthService = require('../services/authService');

const userRegistrationController = async (req, res) => {
  const createdUser = await AuthService.createUser(req.body);

  res.json(createdUser);
};

const userLoginController = async (req, res) => {
  const user = await AuthService.loginUser(req.body);

  res.json(user);
};

module.exports = { userRegistrationController, userLoginController };
