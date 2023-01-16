const { updateStatusContact } = require('../../services/contacts');
const { NotFoundError } = require('../../helpers');

const updateContactStatusByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const updatedContact = await updateStatusContact(contactId, body);

  if (!updatedContact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(updatedContact);
};

module.exports = { updateContactStatusByIdController };
