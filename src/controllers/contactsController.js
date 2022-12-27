const { isValidObjectId } = require('mongoose');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../services/contactsService');
const {
  contactAdditionSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
} = require('../utils/contactsSchema');

const getContactsController = async (_, res, next) => {
  try {
    const data = await listContacts();

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValueContactId = isValidObjectId(contactId);

  if (!isValueContactId) {
    res.status(400).json('Incorrect contact id');
  }

  try {
    const data = await getContactById(contactId);

    if (!data) {
      res.status(404).json({ message: 'Contact has not been found.' });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const addContactController = async (req, res, next) => {
  const body = req.body;

  const { error: validationError } = contactAdditionSchema.validate(body);

  if (validationError) {
    res
      .status(400)
      .json({ message: { ...validationError.details[0].message } });
    return;
  }

  try {
    const addedContact = await addContact(body);

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
};

const removeContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValidContactId = isValidObjectId(contactId);

  if (!isValidContactId) {
    res.status(400).json('Incorrect contact id');
  }

  try {
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      res.status(404).json('Contact has not been found.');
    }

    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

const updateContactByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValidContactId = isValidObjectId(contactId);

  if (!isValidContactId) {
    res.status(400).json('Incorrect contact id');
  }

  // body validation
  const { error: validationError } = contactUpdateSchema.validate(body);

  if (validationError) {
    res
      .status(400)
      .json({ message: { ...validationError.details[0].message } });
    return;
  }

  try {
    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      res.status(404).json({ message: 'Contact has not been found.' });
    }

    res.json(Object.assign(updatedContact, body));
  } catch (error) {
    next(error);
  }
};

const updateContactStatusByIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValidContactId = isValidObjectId(contactId);

  if (!isValidContactId) {
    res.status(400).json('Incorrect contact id.');
  }

  // body validation
  const { error: validationError } = contactStatusUpdateSchema.validate(body);

  if (validationError) {
    res
      .status(400)
      .json({ message: { ...validationError.details[0].message } });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, body);

    if (!updatedContact) {
      res.status(404).json('Contact with the given id has not been found');
    }

    res.json(Object.assign(updatedContact, body));
  } catch (error) {
    next(error);
  }
};
