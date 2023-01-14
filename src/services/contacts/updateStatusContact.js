const Contact = require('../../db/contactModel');

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

module.exports = { updateStatusContact };
