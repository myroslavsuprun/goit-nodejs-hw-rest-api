const { isValidObjectId } = require('mongoose');

const { ValidationError } = require('../helpers/errorHelpers');

const {
  contactAdditionSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
} = require('../utils/contactsSchema');

module.exports = {
  addContactValidation: (req, _, next) => {
    const body = req.body;

    const { error: validationError } = contactAdditionSchema.validate(body);

    if (validationError) {
      next(
        new ValidationError(
          JSON.stringify({ message: { ...validationError.details[0].message } })
        )
      );
    }

    next();
  },
  updateContactValidation: (req, _, next) => {
    const body = req.body;

    // body validation
    const { error: validationError } = contactUpdateSchema.validate(body);

    if (validationError) {
      next(
        new ValidationError(
          JSON.stringify({ message: { ...validationError.details[0].message } })
        )
      );
    }

    next();
  },
  updateContactStatusValidation: (req, _, next) => {
    const body = req.body;

    // body validation
    const { error: validationError } = contactStatusUpdateSchema.validate(body);

    if (validationError) {
      next(
        new ValidationError(
          JSON.stringify({ message: { ...validationError.details[0].message } })
        )
      );
    }

    next();
  },
  idValidation: (req, _, next) => {
    const contactId = req.params.contactId;

    // Whether the contact id given by the client is correct according to MongoDB _id
    const isValueContactId = isValidObjectId(contactId);

    if (!isValueContactId) {
      next(
        new ValidationError(
          JSON.stringify({
            message: 'Incorrect contact id',
          })
        )
      );
    }

    next();
  },
};
