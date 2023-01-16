const authService = require('../../services/authService');

const userLoginController = async (req, res) => {
  const user = await authService.loginUser(req.body);

  const { email, subscription, token, avatarURL } = user;

  res.json({ email, subscription, token, avatarURL });
};

module.exports = { userLoginController };
