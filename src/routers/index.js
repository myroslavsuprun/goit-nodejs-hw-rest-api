module.exports = {
  apiRouter: require('./apiRouter'),
  contactsRouter: require('./contactsRouter'),
  publicRouter: require('./publicRouter'),
  usersRouter: require('./usersRouter'),
  ...require('./paths'),
};
