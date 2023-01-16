const { listContacts } = require('../../services/contacts');

const getContactsController = async (req, res) => {
  const { page = '1', limit = '20', favorite } = req.query;

  const contacts = await listContacts({ page, limit, favorite });

  res.json(contacts);
};

module.exports = { getContactsController };
