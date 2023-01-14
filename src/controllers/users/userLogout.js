const authService = require('../../services/authService');

const userLogoutController = async (req, res) => {
  // Extracting id which was passed through auth Middleware
  const id = req.user.id;

  // Removing user's token from the DB
  await authService.logoutUser(id);

  res.sendStatus(204);
};

module.exports = { userLogoutController };
