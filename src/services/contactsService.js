const { Contact } = require('../db/contactModel');

const listContacts = async () => await Contact.find({});

const getContactById = async contactId => {
  return await Contact.findById(contactId);
};

const removeContact = async contactId => {
  return await Contact.findByIdAndDelete(contactId);
};

const addContact = async body => await Contact.create({ ...body });

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, { $set: { ...body } });
};

const updateStatusContact = async (contactId, body) => {
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
