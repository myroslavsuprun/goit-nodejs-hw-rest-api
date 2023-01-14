const Contact = require('../../db/contactModel');

const { ValidationError } = require('../../helpers/errorHelpers');

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

module.exports = { listContacts };
