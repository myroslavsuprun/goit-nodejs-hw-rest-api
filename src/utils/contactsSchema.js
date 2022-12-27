const Joi = require('joi');

const contactAdditionSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .required(),
  favorite: Joi.boolean().default(false),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string().regex(
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  ),
  favorite: Joi.boolean(),
});

const contactStatusUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactAdditionSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
};
