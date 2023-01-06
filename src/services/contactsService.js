const { Contact } = require('../db/contactModel');
const { ValidationError } = require('../helpers/errorHelpers');

/**
 * Get all the contacts from the DB
 *
 * @async
 * @param {string} page - pagination page number; optional; default value is 1.
 * @param {string} limit - pagination limit numbeer; optional; default value is 20.
 * @returns Contacts from the DB
 */
const listContacts = async ({ page = '1', limit = '20', favorite }) => {
  // Converting string numbers to integers.
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Converting string to boolean if exists.
  if (favorite) {
    favorite = JSON.parse(favorite);
  }

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

  if (favorite !== undefined) {
    query.find({ favorite });
  }

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

/**
 * Updates contact with the given properties on the DB
 *
 * @async
 * @param {string} contactId
 * @param {object} body
 * @returns Contact before update from the DB
 */
const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { $set: { ...body } },
    { new: true }
  );
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
  const data = await Contact.findByIdAndUpdate(
    contactId,
    { $set: { favorite: body.favorite } },
    { new: true }
  );

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
