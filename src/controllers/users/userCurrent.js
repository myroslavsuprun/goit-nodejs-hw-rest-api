const { NotFoundError } = require('../../helpers/errorHelpers');
const AuthService = require('../../services/authService');

const userCurrentController = async (req, res) => {
  // Extracting id which was passed through auth Middleware
  const id = req.user.id;

  const user = await AuthService.getUserById(id);

  if (!user) {
    throw new NotFoundError('User has not been found.');
  }

  const { email, subscription, avatarURL } = user;

  res.json({ email, subscription, avatarURL });
};

module.exports = { userCurrentController };
