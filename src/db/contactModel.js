const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set contact's name"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

/**
 * MongoDB Contact model
 */
const Contact = mongoose.model('Contact', contactSchema);

module.exports = {
  Contact,
};
