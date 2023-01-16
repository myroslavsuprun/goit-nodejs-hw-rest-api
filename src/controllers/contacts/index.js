module.exports = {
  ...require('./getContactById'),
  ...require('./addContact'),
  ...require('./getContacts'),
  ...require('./removeContactById'),
  ...require('./updateContactById'),
  ...require('./updateContactStatusById'),
};
