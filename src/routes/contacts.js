const express = require('express');
const { isValidObjectId } = require('mongoose');
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require('../services/contacts');

const router = express.Router();

// TODO: Add controllers folder and files
// TODO: Add helpers and wrappers
// TODO: move schema to another file
// TODO: Move validation to services file. i.e. contact has not been found. it must not be here

const additionSchema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .required(),
  favorite: Joi.boolean().default(false),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string().regex(
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  ),
  favorite: Joi.boolean(),
});

const favoriteUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

// GET: all contacts in the DB
router.get('/', async (_, res, next) => {
  try {
    const data = await listContacts();

    res.json(data);
  } catch (error) {
    next(error);
  }
});

// GET: by contact id
router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValueContactId = isValidObjectId(contactId);

  if (!isValueContactId) {
    res.status(400).json('Incorrect contact id');
  }

  try {
    const data = await getContactById(contactId);

    if (!data) {
      res.status(404).json({ message: 'Contact has not been found.' });
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

/**
 * POST: Create and save a new contact in the DB.
 *
 * @returns new contact
 */
router.post('/', async (req, res, next) => {
  const body = req.body;

  const { error: validationError } = additionSchema.validate(body);

  if (validationError) {
    res
      .status(400)
      .json({ message: { ...validationError.details[0].message } });
    return;
  }

  try {
    const addedContact = await addContact(body);

    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE: Remove contact from the DB
 *
 * @returns removed contact
 */
router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValidContactId = isValidObjectId(contactId);

  if (!isValidContactId) {
    res.status(400).json('Incorrect contact id');
  }

  try {
    const removedContact = await removeContact(contactId);

    if (!removedContact) {
      res.status(404).json('Contact has not been found.');
    }

    res.json(removedContact);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT: Updates exsiting contact in the DB
 *
 * @returns updated contact
 */
router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValidContactId = isValidObjectId(contactId);

  if (!isValidContactId) {
    res.status(400).json('Incorrect contact id');
  }

  // body validation
  const { error: validationError } = updateSchema.validate(body);

  if (validationError) {
    res
      .status(400)
      .json({ message: { ...validationError.details[0].message } });
    return;
  }

  try {
    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      res.status(404).json({ message: 'Contact has not been found.' });
    }

    res.json(Object.assign(updatedContact, body));
  } catch (error) {
    next(error);
  }
});

/**
 * PATCH: Update favorite field for a specific contact
 *
 * @returns updated contact
 */
router.patch('/:contactId/favorite', async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  // Whether the contact id given by the client is correct according to MongoDB _id
  const isValidContactId = isValidObjectId(contactId);

  if (!isValidContactId) {
    res.status(400).json('Incorrect contact id.');
  }

  // body validation
  const { error: validationError } = favoriteUpdateSchema.validate(body);

  if (validationError) {
    res
      .status(400)
      .json({ message: { ...validationError.details[0].message } });
  }

  try {
    const updatedContact = await updateStatusContact(contactId, body);

    if (!updatedContact) {
      res.status(404).json('Contact with the given id has not been found');
    }

    res.json(Object.assign(updatedContact, body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
