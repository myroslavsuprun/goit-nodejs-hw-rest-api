const { removeContact } = require('../../services/contacts');
const { NotFoundError } = require('../../helpers');

const removeContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const removedContact = await removeContact(contactId);

  if (!removedContact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(removedContact);
};

module.exports = { removeContactByIdController };
