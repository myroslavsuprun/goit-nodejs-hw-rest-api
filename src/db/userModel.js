const mongoose = require('mongoose');

const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
});

/**
 * MongoDB User model
 */
const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
