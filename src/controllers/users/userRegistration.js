const authService = require('../../services/authService');

const userRegistrationController = async (req, res) => {
  const user = await authService.createUser(req.body);

  const { email, subscription, avatarURL } = user;

  await authService.sendVerificationEmail(email);

  res.status(201);
  res.json({ email, subscription, avatarURL });
};

module.exports = { userRegistrationController };
