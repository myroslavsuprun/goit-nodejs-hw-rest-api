const { addContact } = require('../../services/contacts');

const addContactController = async (req, res) => {
  const body = req.body;

  const addedContact = await addContact(body);

  res.status(201).json(addedContact);
};

module.exports = { addContactController };
