const { EnhancedError } = require('./errorHelpers');

/**
 *
 * @param {*} controller
 * @returns new function which invokes the controller and catches internal errors.
 * Errors are sent next to the middleware.
 */
const asyncWrapper = controller => {
  return async (req, res, next) => {
    await controller(req, res).catch(error => next(error));
  };
};

/**
 * Error handler middleware
 *
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const errorHandler = (error, _, res, __) => {
  if (error instanceof EnhancedError) {
    return res.status(error.status).json({ message: error.message });
  }

  res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
