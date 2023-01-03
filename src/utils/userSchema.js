const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

module.exports = { userRegistrationSchema };
