const { ValidationError } = require('../helpers/errorHelpers');

const { userRegistrationSchema } = require('../utils/userSchema');

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
