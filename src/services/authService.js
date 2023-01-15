const jwt = require('jsonwebtoken');
const path = require('path');

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
   * @returns user's credentials
   */
  async createUser(body) {
    const user = await User.findOne({ email: body.email });

    if (user) {
      throw new ConflictError('User with the provided email already exists.');
    }

    const createdUser = await User.create(body);

    return createdUser;
  }

  /**
   * Login user by email and password
   *
   * @public
   * @method
   * @memberof AuthService
   * @param {object} body - object containing password and email
   * @returns user's credentials
   */
  async loginUser(body) {
    const user = await this.#getUser({ ...body });

    if (!user) {
      throw new NotAuthorizedError('The email or password is incorrect.');
    }

    const { id } = user;

    const token = this.#generateToken({ id });
    await User.findByIdAndUpdate(id, { token });

    // Update token value in the user object.
    Object.assign(user, { token });

    return user;
  }

  /**
   * Remove user's token from the DB
   *
   * @public
   * @method
   * @memberof AuthService
   * @param {string} id - user's _id
   * @returns user's credentials before token update
   */
  async logoutUser(id) {
    return await User.findByIdAndUpdate(id, { token: null });
  }

  async updateUserSubscription({ id, subscription }) {
    return await User.findByIdAndUpdate(id, { subscription }, { new: true });
  }

  async updateUserAvatar(avatar, id) {
    const paths = avatar.path.split(path.sep).slice(-3).join('/');
    const padPath = paths.padStart(paths.length + 1, '/');

    return await User.findByIdAndUpdate(
      id,
      { avatarURL: padPath },
      { new: true }
    );
  }

  /**
   * Get user's data from the DB by id.
   *
   * @public
   * @method
   * @memberof AuthService
   * @param {string} id
   * @returns user's credentials
   */
  async getUserById(id) {
    return await User.findById(id);
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
