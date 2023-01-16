module.exports = {
  notFountHandler: require('./notFoundHandler'),
  authMiddleware: require('./authMiddleware'),
  ...require('./errorHandler'),
  ...require('./uploadAvatarMiddleware'),
  ...require('./validationMiddlewares'),
};
