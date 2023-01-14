const { getContactById } = require('../../services/contacts');

const { NotFoundError } = require('../../helpers/errorHelpers');

const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(contact);
};

module.exports = { getContactByIdController };
