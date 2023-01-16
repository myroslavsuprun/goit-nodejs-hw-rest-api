const { updateContact } = require('../../services/contacts');
const { NotFoundError } = require('../../helpers');

const updateContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const updatedContact = await updateContact(contactId, body);

  if (!updatedContact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(updatedContact);
};

module.exports = { updateContactByIdController };
