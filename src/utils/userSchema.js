const Joi = require('joi');

const userSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

const userVerificationIdSchema = Joi.object({
  verificationToken: Joi.string()
    .regex(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    )
    .message("'verificationToken' must represent a uuid value.")
    .required(),
});

const userVerificationResendSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  userSchema,
  userSubscriptionUpdateSchema,
  userVerificationIdSchema,
  userVerificationResendSchema,
};
