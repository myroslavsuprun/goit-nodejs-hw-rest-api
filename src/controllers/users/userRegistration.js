const authService = require('../../services/authService');

const userRegistrationController = async (req, res) => {
  const user = await authService.createUser(req.body);

  const { email, subscription } = user;
  res.status(201);
  res.json({ email, subscription });
};

module.exports = { userRegistrationController };
