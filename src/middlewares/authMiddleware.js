const jwt = require('jsonwebtoken');

const AuthService = require('../services/authService');

const { NotAuthorizedError } = require('../helpers/errorHelpers');
const envVariables = require('../utils/envVariables');

/**
 * Authorization middleware which verifies the provided token in the request headers.
 * If token is not valid, an error is thrown.
 */
const authMiddleware = async (req, _, next) => {
  // Get authorization token from the headers.
  const token = req.headers.authorization.split(' ')[1];

  // Validate token.
  const isValidToken = await verifyToken(token);

  if (!isValidToken) {
    throw new NotAuthorizedError('Not Authorized');
  }

  const { id } = jwt.decode(token);

  const user = await AuthService.getUserById(id);

  if (!user || token !== user.token) {
    throw new NotAuthorizedError('Not Authorized');
  }

  // Adding user's credential into request object.
  req.user = { id };

  next();
};

/**
 * Token verification
 *
 * @param {string} token
 * @returns true if valid and false if invalid
 */
async function verifyToken(token) {
  // If the token is not valid, then an error is thrown which returns false.
  try {
    await jwt.verify(token, envVariables.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

module.exports = authMiddleware;
