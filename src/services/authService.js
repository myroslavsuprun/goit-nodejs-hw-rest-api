const jwt = require('jsonwebtoken');
const path = require('path');

const { User } = require('../db');

const {
  ConflictError,
  NotAuthorizedError,
  NotFoundError,
  ValidationError,
} = require('../helpers');

const { resizeAndMoveImage, envVariables } = require('../utils');
const SgMailService = require('./sgMailService');

// **** Declarations **** //

const SECRET_KEY = envVariables.JWT_SECRET;
const uploadDir = path.join(process.cwd(), 'public', 'avatars');

// **** Functions **** //

/**
 * Authentication user service
 *
 * @class
 * @member createUser
 * @member loginUser
 * @member logoutUser
 * @member updateUserAvatar
 * @member updateUserSubscription
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

    if (!user.verify) {
      throw new ValidationError('User is not verified.');
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

  /**
   * Uploades resized image into public directory, saves the path to the image directory on MongoDB.
   *
   * @param {object} avatar - Avatar object containing avatar path and filename;
   * @param {string} id - user Id for updating the avatar;
   * @returns - image path.
   */
  async updateUserAvatar(avatar, id) {
    // Resize the image and move it to another directory.
    avatar.path = await resizeAndMoveImage(
      avatar.path,
      uploadDir,
      avatar.filename
    );

    // Receving relative path from our project "root" directory.
    const relativePath = avatar.path.split(path.sep).slice(-3);

    // Joining the path into a valid string.
    const avatarURL = path.join('/', ...relativePath);

    return await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
  }

  /**
   * Change user's verification status.
   *
   * @param {string} verificationToken - unique verification token.
   * @returns {void} void.
   */
  async verifyUser(verificationToken) {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new NotFoundError('User has not been found.');
    }

    await User.updateOne(
      { verificationToken },
      { verify: true, verificationToken: null }
    );
  }

  async sendVerificationEmail(email) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFoundError(
        'User with the provided email has not been found.'
      );
    }

    if (user.verify) {
      throw new ValidationError('User has already been verified.');
    }

    const { verificationToken } = user;

    const mailService = new SgMailService(email);

    await mailService.sendVerificationMessage(verificationToken);
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

// **** Exports **** //

module.exports = new AuthService();
