const bcrypt = require('bcrypt');

const { addUser } = require('../services/usersService');

const userRegistrationController = async (req, res) => {
  const { password, email } = req.body;

  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = await addUser({ password: encryptedPassword, email });

  res.json(createdUser);
};

module.exports = { userRegistrationController };
