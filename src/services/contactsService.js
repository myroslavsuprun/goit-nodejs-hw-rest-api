const { Contact } = require('../db/contactModel');

/**
 * Get all the contacts from the DB
 * @async
 * @returns Contacts from the DB
 */
const listContacts = async () => await Contact.find({});

/**
 * Get contact by id from the DB
 * @async
 * @param {string} contactId
 * @returns found contact by id
 */
const getContactById = async contactId => {
  return await Contact.findById(contactId);
};

/**
 * Remove contact by id from the DB
 * @async
 * @param {string} contactId
 * @returns deleted contact by id
 */
const removeContact = async contactId => {
  return await Contact.findByIdAndDelete(contactId);
};

/**
 * Create a new contact in the DB
 * @async
 * @param {object} body
 * @returns Newly created contact
 */
const addContact = async body => await Contact.create({ ...body });

/**
 * Updates contact with the given properties on the DB
 *
 * @async
 * @param {string} contactId
 * @param {object} body
 * @returns Contact before update from the DB
 */
const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(contactId, { $set: { ...body } });
};

/**
 * Updates contact status with the given id and favorite boolean value
 *
 * @async
 * @param {string} contactId
 * @param {object} body
 * @returns Contact before update from the DB
 */
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
