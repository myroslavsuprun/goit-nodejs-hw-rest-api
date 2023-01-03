const express = require('express');

const {
  getContactsController,
  getContactByIdController,
  removeContactByIdController,
  updateContactByIdController,
  updateContactStatusByIdController,
  addContactController,
} = require('../controllers/contactsController');

const {
  validationBySchemaMiddleware,
  idValidationMiddleware,
} = require('../middlewares/validationMiddlewares');
const {
  contactUpdateSchema,
  contactStatusUpdateSchema,
  contactAdditionSchema,
} = require('../utils/contactsSchema');

const router = express.Router();

// GET: all contacts in the DB
router.get('/', getContactsController);

// GET: by contact id
router.get('/:contactId', idValidationMiddleware, getContactByIdController);

/**
 * POST: Create and save a new contact in the DB.
 *
 * @returns new contact
 */
router.post(
  '/',
  validationBySchemaMiddleware(contactAdditionSchema, 'body'),
  addContactController
);

/**
 * DELETE: Remove contact from the DB
 *
 * @returns removed contact
 */
router.delete(
  '/:contactId',
  idValidationMiddleware,
  removeContactByIdController
);

/**
 * PUT: Updates exsiting contact in the DB
 *
 * @returns updated contact
 */
router.put(
  '/:contactId',
  idValidationMiddleware,
  validationBySchemaMiddleware(contactUpdateSchema, 'body'),
  updateContactByIdController
);

/**
 * PATCH: Update favorite field for a specific contact
 *
 * @returns updated contact
 */
router.patch(
  '/:contactId/favorite',
  idValidationMiddleware,
  validationBySchemaMiddleware(contactStatusUpdateSchema, 'body'),
  updateContactStatusByIdController
);

module.exports = router;
