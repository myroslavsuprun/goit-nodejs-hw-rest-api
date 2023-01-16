const Contact = require('../../db');

/**
 * Create a new contact in the DB
 * @async
 * @param {object} body
 * @returns Newly created contact
 */
const addContact = async body => await Contact.create({ ...body });

module.exports = { addContact };
