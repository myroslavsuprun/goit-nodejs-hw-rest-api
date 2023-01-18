const AuthService = require('../../services/authService');

const userVerificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await AuthService.verifyUser(verificationToken);

  res.status(204);
  res.send();
};

module.exports = { userVerificationController };
