// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
//   updateStatusContact,
// } = require('../services/contactsService');

// const { NotFoundError } = require('../helpers/errorHelpers');

const userRegistrationController = (req, res) => {
  res.json(req.body);
};

module.exports = { userRegistrationController };
