module.exports = {
  ...require('./notFoundHandler'),
  ...require('./authMiddleware'),
  ...require('./errorHandler'),
  ...require('./uploadAvatarMiddleware'),
  ...require('./validationMiddlewares'),
};
