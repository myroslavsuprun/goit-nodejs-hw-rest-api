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
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
  idValidation,
} = require('../middlewares/contactsValidationMiddleware');

const router = express.Router();

// GET: all contacts in the DB
router.get('/', getContactsController);

// GET: by contact id
router.get('/:contactId', idValidation, getContactByIdController);

/**
 * POST: Create and save a new contact in the DB.
 *
 * @returns new contact
 */
router.post('/', addContactValidation, addContactController);

/**
 * DELETE: Remove contact from the DB
 *
 * @returns removed contact
 */
router.delete('/:contactId', idValidation, removeContactByIdController);

/**
 * PUT: Updates exsiting contact in the DB
 *
 * @returns updated contact
 */
router.put(
  '/:contactId',
  idValidation,
  updateContactValidation,
  updateContactByIdController
);

/**
 * PATCH: Update favorite field for a specific contact
 *
 * @returns updated contact
 */
router.patch(
  '/:contactId/favorite',
  idValidation,
  updateContactStatusValidation,
  updateContactStatusByIdController
);

module.exports = router;
