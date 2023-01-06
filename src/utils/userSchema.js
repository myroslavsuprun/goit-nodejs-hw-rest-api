const Joi = require('joi');

const userSubscriptionUpdateSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

module.exports = { userSchema, userSubscriptionUpdateSchema };
