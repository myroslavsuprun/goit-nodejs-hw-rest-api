const { EnhancedError } = require('../helpers/errorHelpers');

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

module.exports = errorHandler;
