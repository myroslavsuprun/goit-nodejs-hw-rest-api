const AuthService = require('../../services/authService');

const userVerificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await AuthService.verifyUser(verificationToken);

  res.sendStatus(204);
};

module.exports = { userVerificationController };
