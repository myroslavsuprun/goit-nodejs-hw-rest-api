const authService = require('../../services/authService');

const userAvatarUpdateController = async (req, res) => {
  const avatar = req.file;
  const userId = req.user.id;

  const user = await authService.updateUserAvatar(avatar, userId);

  const { avatarURL } = user;

  res.json({ avatarURL });
};

module.exports = { userAvatarUpdateController };
