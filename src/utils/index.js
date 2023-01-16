module.exports = {
  resizeAndMoveImage: require('./resizeAndMoveImage'),
  envVariables: require('./envVariables'),

  ...require('./contactsSchema'),
  ...require('./userSchema'),
};
