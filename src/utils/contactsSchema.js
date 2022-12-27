const Joi = require('joi');

/**
 * Joi validation schema for new contact addition
 *
 * @param name - with type string, and aplhanum with validation; required
 * @param email - type string with email validation; required
 * @param phone - type string with phone RegEx validation; required
 * @param favorite - type boolean with default false value;
 */
const contactAdditionSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .required(),
  favorite: Joi.boolean().default(false),
});

/**
 * Joi validation schema for contact update
 *
 * @param name with type string, and aplhanum with validation;
 * @param email - type string with email validation;
 * @param phone - type string with phone RegEx validation;
 * @param favorite - type boolean;
 * All variants are optional, but at least one is required.
 */
const contactUpdateSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string().regex(
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  ),
  favorite: Joi.boolean(),
}).xor('name', 'email', 'phone', 'favorite');

/**
 * Joi validation schema for contact status update
 *
 * @param favorite - type boolean;
 */
const contactStatusUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  contactAdditionSchema,
  contactUpdateSchema,
  contactStatusUpdateSchema,
};
