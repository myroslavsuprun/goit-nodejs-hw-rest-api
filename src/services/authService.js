const jwt = require('jsonwebtoken');

const { User } = require('../db/userModel');

const {
  ConflictError,
  NotAuthorizedError,
} = require('../helpers/errorHelpers');

const envVariables = require('../utils/envVariables');

const SECRET_KEY = envVariables.JWT_SECRET;

/**
 * Authentication user service
 *
 * @class
 * @member createUser
 * @member loginUser
 * @member logoutUser
 */
class AuthService {
  /**
   * Create new user and save it in the DB
   *
   * @public
   * @method
   * @memberof AuthService
   * @param {object} body - object containing password and email
   * @returns credentials of the newly created user for the client
   */
  async createUser(body) {
    const user = await User.findOne({ email: body.email });

    if (user) {
      throw new ConflictError('User with the provided email already exists.');
    }

    const { id, email, subscription } = await User.create(body);

    return {
      id,
      email,
      subscription,
    };
  }

  /**
   * Login user by email and password
   *
   * @public
   * @method
   * @memberof AuthService
   * @param {object} body - object containing password and email
   * @returns JWT, and authorized user's credentials for the client
   */
  async loginUser(body) {
    const user = await this.#getUser({ ...body });

    if (!user) {
      throw new NotAuthorizedError('The email or password is incorrect.');
    }

    const { email, id, subscription } = user;

    const token = this.#generateToken({ email, id, subscription });
    await User.findByIdAndUpdate(id, token);

    return { id, email, subscription, token };
  }

  // TODO: Check what it might return
  /**
   * Remove user's token from the DB
   *
   * @public
   * @method
   * @memberof AuthService
   * @param {string} id - user's _id
   * @returns user's credentials before token removal
   */
  async logoutUser(id) {
    return await User.findByIdAndUpdate(id, { token: null });
  }

  /**
   *  Get user's credentials from the database. Validates password and email.
   *
   * @private
   * @method
   * @param {object} body- object containing password and login
   * @returns user's credentials
   */
  async #getUser(body) {
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  /**
   * Create JWT with the provided payload.
   *
   *
   * @param {object} payload - data to encode in the JWT
   * @param {string} expirationTime - default value "2d"; optional
   * @returns
   */
  #generateToken(payload, expirationTime = '2d') {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: expirationTime });

    return token;
  }
}

module.exports = new AuthService();
