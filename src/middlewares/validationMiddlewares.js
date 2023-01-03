const { isValidObjectId } = require('mongoose');

const { ValidationError } = require('../helpers/errorHelpers');

/**
 * Validation middleware using Joi schema. Applied to request object properties.
 *
 * @param {ObjectSchema} schema - Joi Schema for validation
 * @param {'body' | 'query' | 'params' | 'headers'} property -
 * Request property as 'body' | 'query' | 'params' | 'headers'
 * @returns {void}
 */
const validationBySchemaMiddleware = (schema, property) => {
  return (req, _, next) => {
    const { error } = schema.validate(req[property]);

    if (!error) {
      next();
      return;
    }

    const { details } = error;
    const message = details.map(info => info.message).join(',');

    throw new ValidationError(message);
  };
};

/**
 * MongoDB ID validation middleware. Checks all request parameters for having a valid object id
 * If the provided id is incorrect, a new error is being thrown.
 */
const idValidationMiddleware = (req, _, next) => {
  const params = req.params;

  for (const param of Object.values(params)) {
    if (!isValidObjectId(param)) {
      throw new ValidationError('Incorrect id provided');
    }
  }

  next();
};

module.exports = {
  validationBySchemaMiddleware,
  idValidationMiddleware,
};
