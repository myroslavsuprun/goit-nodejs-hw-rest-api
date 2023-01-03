/**
 * The file contains Router module for contacts path
 */
const express = require('express');

// Paths
const paths = require('./paths/contactsPaths');

const {
  getContactsController,
  getContactByIdController,
  removeContactByIdController,
  updateContactByIdController,
  updateContactStatusByIdController,
  addContactController,
} = require('../controllers/contactsController');

// Validation middlewares
const {
  validationBySchemaMiddleware,
  idValidationMiddleware,
} = require('../middlewares/validationMiddlewares');

// Validation schemas
const {
  contactUpdateSchema,
  contactStatusUpdateSchema,
  contactAdditionSchema,
} = require('../utils/contactsSchema');

// **** Declarations **** //

/**
 * Contacts route Router module
 */
const router = express.Router();

// **** Middlewares **** //

// GET: all contacts in the DB
router.get(paths.main, getContactsController);

// GET: by contact id
router.get(paths.byContactId, idValidationMiddleware, getContactByIdController);

/**
 * POST: Create and save a new contact in the DB.
 *
 * @returns new contact
 */
router.post(
  paths.main,
  validationBySchemaMiddleware(contactAdditionSchema, 'body'),
  addContactController
);

/**
 * DELETE: Remove contact from the DB
 *
 * @returns removed contact
 */
router.delete(
  paths.byContactId,
  idValidationMiddleware,
  removeContactByIdController
);

/**
 * PUT: Updates exsiting contact in the DB
 *
 * @returns updated contact
 */
router.put(
  paths.byContactId,
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
  paths.favoriteByContactId,
  idValidationMiddleware,
  validationBySchemaMiddleware(contactStatusUpdateSchema, 'body'),
  updateContactStatusByIdController
);

// **** Export **** //

module.exports = router;
