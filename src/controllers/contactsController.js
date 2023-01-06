const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../services/contactsService');

const { NotFoundError } = require('../helpers/errorHelpers');

const getContactsController = async (req, res) => {
  const { page = '1', limit = '20' } = req.query;

  const contacts = await listContacts({ page, limit });

  res.json(contacts);
};

const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(contact);
};

const addContactController = async (req, res) => {
  const body = req.body;

  const addedContact = await addContact(body);

  res.status(201).json(addedContact);
};

const removeContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const removedContact = await removeContact(contactId);

  if (!removedContact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(removedContact);
};

const updateContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const updatedContact = await updateContact(contactId, body);

  if (!updatedContact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(updatedContact);
};

const updateContactStatusByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const updatedContact = await updateStatusContact(contactId, body);

  if (!updatedContact) {
    throw new NotFoundError('Contact has not been found.');
  }

  res.json(updatedContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactByIdController,
  updateContactByIdController,
  updateContactStatusByIdController,
};
