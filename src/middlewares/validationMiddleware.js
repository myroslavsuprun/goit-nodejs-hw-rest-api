const { isValidObjectId } = require('mongoose');

const { ValidationError } = require('../helpers/errorHelpers');

const {
  contactAdditionSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
} = require('../utils/contactsSchema');

module.exports = {
  /**
   * Joi validation middleware.
   * If there is a validation error, an error will be thrown.
   * Otherwise next() will be invoked.
   *
   * @param {*} req
   * @param {*} _
   * @param {*} next
   */
  addContactValidation: (req, _, next) => {
    const body = req.body;

    const { error: validationError } = contactAdditionSchema.validate(body);

    if (validationError) {
      next(new ValidationError(validationError.details[0].message));
    }

    next();
  },
  /**
   * Joi validation middleware.
   * If there is a validation error, an error will be thrown.
   * Otherwise next() will be invoked.
   *
   * @param {*} req
   * @param {*} _
   * @param {*} next
   */
  updateContactValidation: (req, _, next) => {
    const body = req.body;

    // body validation
    const { error: validationError } = contactUpdateSchema.validate(body);

    if (validationError) {
      next(new ValidationError(validationError.details[0].message));
    }

    next();
  },
  /**
   * Joi validation middleware.
   * If there is a validation error, an error will be thrown.
   * Otherwise next() will be invoked.
   *
   * @param {*} req
   * @param {*} _
   * @param {*} next
   */
  updateContactStatusValidation: (req, _, next) => {
    const body = req.body;

    // body validation
    const { error: validationError } = contactStatusUpdateSchema.validate(body);

    if (validationError) {
      next(new ValidationError(validationError.details[0].message));
    }

    next();
  },

  /**
   * MongoDB ID validation middleware.
   * If the provided id is incorrect, a new error is being thrown.
   *
   * @param {*} req
   * @param {*} _
   * @param {*} next
   */
  idValidation: (req, _, next) => {
    const contactId = req.params.contactId;

    const isValueContactId = isValidObjectId(contactId);

    if (!isValueContactId) {
      next(new ValidationError('Incorrect contact id'));
    }

    next();
  },
};
