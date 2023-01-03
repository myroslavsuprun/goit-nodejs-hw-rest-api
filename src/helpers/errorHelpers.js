/**
 * EnhancedError for checking instances;
 *
 * @class
 *
 * @constructor
 * @param message - error message
 * @param status - HTTP Status which is set to 400
 */
class EnhancedError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * ValidationError
 *
 * @class
 * @constructor
 * @param message - error message
 * @param status - HTTP Status which is set to 400
 */
class ValidationError extends EnhancedError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

/**
 * NotFoundError
 *
 * @class
 * @constructor
 * @param message - error message
 * @param status - HTTP Status which is set to 404
 */
class NotFoundError extends EnhancedError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

/**
 * Conflict Error with 409 code
 *
 * @class
 * @constructor
 * @param message - error message
 * @param status - HTTP status with 409 code
 */
class ConflictError extends EnhancedError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  EnhancedError,
  ValidationError,
  NotFoundError,
  ConflictError,
};
