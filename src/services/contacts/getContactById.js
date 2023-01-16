const Contact = require('../../db');

/**
 * Get contact by id from the DB
 * @async
 * @param {string} contactId
 * @returns found contact by id
 */
const getContactById = async contactId => {
  return await Contact.findById(contactId);
};

module.exports = { getContactById };
