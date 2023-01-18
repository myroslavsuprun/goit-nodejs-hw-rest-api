const sgMail = require('@sendgrid/mail');

const { envVariables } = require('../utils');

// **** Declarations **** //

const SEND_GRID_API_KEY = envVariables.SEND_GRID_API_KEY;
const { PORT, HOST } = envVariables;

// **** API set up **** //

sgMail.setApiKey(SEND_GRID_API_KEY);

// **** Class **** //

/**
 * SendGrid mail service
 *
 * @class
 */
class SgMailService {
  #from = 'sirmiroslavsuprun@gmail.com';
  #subject = 'ContactAPI';
  #text = '';
  #html = '';

  /**
   * @param {string} email receiver's email address;
   */
  constructor(email) {
    this.to = email;
  }

  /**
   * Set message subject;
   */
  set subject(subject) {
    this.#subject = subject;
  }

  /**
   * Set message text;
   */
  set text(text) {
    this.#text = text;
  }

  /**
   * Set message innerHTML;
   */
  set html(html) {
    this.#html = html;
  }

  /**
   * Send custom message with the set data.
   */
  async sendMessage() {
    const message = {
      to: this.to,
      from: this.#from,
      subject: this.#subject,
      text: this.#text,
      html: this.#html,
    };

    await sgMail.send(message);
  }

  /**
   * Set custom message for user's account registration verification;
   *
   * @param {string} verificationToken - User's verification token which will be sent;
   *
   * @returns {void} void.
   */
  async sendVerificationMessage(verificationToken) {
    const message = {
      to: this.to,
      from: this.#from,
      subject: 'Verify your registration on ContactsAPI',
      text: `Hi there, \
      Thank you for registration on ContactsAPI service. \
      Please, verify your email address: \
      http://${HOST}:${PORT}/api/users/verfiy/${verificationToken}
      `,
      html: `<p>Hi there, </p> \
      <p>Thank you for registration on ContactsAPI service.</p>\
      <p>Please, <a href="http://${HOST}:${PORT}/api/users/verfiy/${verificationToken}">
      verify</a> your email address.</p>\
      `,
    };

    await sgMail.send(message);
  }
}

// **** Exports **** //

module.exports = SgMailService;
