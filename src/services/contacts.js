const { Contact } = require('../db/contactModel');

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async contactId => {
  if (!contactId) {
    return undefined;
  }

  return await Contact.findById(contactId);
};

const removeContact = async contactId => {
  if (!contactId) {
    return undefined;
  }

  return await Contact.findByIdAndDelete(contactId);
};

const addContact = async body => {
  if (Object.keys(body).length <= 2) {
    return undefined;
  }

  return await Contact.create({ ...body });
};

const updateContact = async (contactId, body) => {
  if (!contactId) {
    return undefined;
  }

  if (Object.keys(body).length === 0) {
    return undefined;
  }

  return await Contact.findByIdAndUpdate(contactId, { $set: { ...body } });
};

const updateStatusContact = async (contactId, body) => {
  if (!contactId) {
    return undefined;
  }

  if (!Object.hasOwn(body, 'favorite')) {
    return undefined;
  }

  const data = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite: body.favorite },
  });

  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
