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
} = require('../middlewares/validationMiddleware');
const { asyncWrapper } = require('../helpers/routeHelpers');

const router = express.Router();

// TODO: Move validation to services file. i.e. contact has not been found. it must not be here
// TODO: Add comments JsDoc

// GET: all contacts in the DB
router.get('/', asyncWrapper(getContactsController));

// GET: by contact id
router.get('/:contactId', idValidation, asyncWrapper(getContactByIdController));

/**
 * POST: Create and save a new contact in the DB.
 *
 * @returns new contact
 */
router.post('/', addContactValidation, asyncWrapper(addContactController));

/**
 * DELETE: Remove contact from the DB
 *
 * @returns removed contact
 */
router.delete(
  '/:contactId',
  idValidation,
  asyncWrapper(removeContactByIdController)
);

/**
 * PUT: Updates exsiting contact in the DB
 *
 * @returns updated contact
 */
router.put(
  '/:contactId',
  idValidation,
  updateContactValidation,
  asyncWrapper(updateContactByIdController)
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
  asyncWrapper(updateContactStatusByIdController)
);

module.exports = router;
