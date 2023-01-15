const userAvatarUpdateController = (req, res) => {
  const avatar = req.file;
  // Extracting user Id which was passed throught AuthMiddleware
  const userId = req.user.id;

  res.send(avatar);
};

module.exports = { userAvatarUpdateController };
