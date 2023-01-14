const { Contact } = require('../../db/contactModel');

/**
 * Remove contact by id from the DB
 * @async
 * @param {string} contactId
 * @returns deleted contact by id
 */
const removeContact = async contactId => {
  return await Contact.findByIdAndDelete(contactId);
};

module.exports = { removeContact };
