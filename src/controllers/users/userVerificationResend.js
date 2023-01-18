const AuthService = require('../../services/authService');

const userVerificationResendController = async (req, res) => {
  const { email } = req.body;

  await AuthService.sendVerificationEmail(email);

  res.sendStatus(204);
};

module.exports = { userVerificationResendController };
