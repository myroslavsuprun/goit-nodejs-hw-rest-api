const Contact = require('../../db');

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

module.exports = { updateContact };
