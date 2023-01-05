const { Contact } = require('../db/contactModel');
const { ValidationError } = require('../helpers/errorHelpers');

/**
 * Get all the contacts from the DB
 * @async
 * @returns Contacts from the DB
 */
const listContacts = async ({ page = '1', limit = '20' }) => {
  // Converting string number to integers.
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  if (limit >= 21) {
    throw new ValidationError('"limit" property cannot be more than 20.');
  }

  // Setting the skip value.
  const skip = (page - 1) * limit;

  // Declaring find query for Contact model.
  const query = Contact.find({});

  // Setting query options.
  query.limit(limit);
  query.skip(skip);

  // Executing the query and returning the result.
  return await query.exec();
};

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

// TODO: set new value as the third argument
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
