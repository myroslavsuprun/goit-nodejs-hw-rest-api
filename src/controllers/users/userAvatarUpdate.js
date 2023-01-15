const path = require('path');

const authService = require('../../services/authService');

const userAvatarUpdateController = async (req, res) => {
  const avatar = req.file;
  const { path, filename } = avatar;
  const userId = req.user.id;

  const user = await authService.updateUserAvatar({ path, filename }, userId);

  const { avatarURL } = user;

  res.json({ avatarURL });
};

module.exports = { userAvatarUpdateController };
