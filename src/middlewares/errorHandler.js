const { EnhancedError } = require('../helpers');

/**
 * Error handler middleware
 *
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const customErrorHandler = (error, _, res, next) => {
  if (error instanceof EnhancedError) {
    return res.status(error.status).json({ message: error.message });
  }

  next(error);
};

const errorHandler = (error, _, res, __) => {
  res.status(500).json({ message: error.message });
};

module.exports = { customErrorHandler, errorHandler };
