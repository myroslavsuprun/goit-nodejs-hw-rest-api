const { ValidationError } = require('../helpers/errorHelpers');

const { userRegistrationSchema } = require('../utils/userSchema');

// TODO: Create one-way validation with different parameters;

module.exports = {
  userRegistrationValidation: (req, _, next) => {
    const body = req.body;

    const { error } = userRegistrationSchema.validate(body);

    if (error) {
      throw new ValidationError(error.details[0].message);
    }

    next();
  },
};
