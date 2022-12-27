const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../services/contactsService');

const getContactsController = async (_, res) => {
  const data = await listContacts();

  res.json(data);
};

const getContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;

  const data = await getContactById(contactId);

  if (!data) {
    res.status(404).json({ message: 'Contact has not been found.' });
  }

  res.json(data);
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
    res.status(404).json('Contact has not been found.');
  }

  res.json(removedContact);
};

const updateContactByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const updatedContact = await updateContact(contactId, body);

  if (!updatedContact) {
    res.status(404).json({ message: 'Contact has not been found.' });
  }

  res.json(Object.assign(updatedContact, body));
};

const updateContactStatusByIdController = async (req, res) => {
  const contactId = req.params.contactId;
  const body = req.body;

  const updatedContact = await updateStatusContact(contactId, body);

  if (!updatedContact) {
    res.status(404).json('Contact with the given id has not been found');
  }

  res.json(Object.assign(updatedContact, body));
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactByIdController,
  updateContactByIdController,
  updateContactStatusByIdController,
};
