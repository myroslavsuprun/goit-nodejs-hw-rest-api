const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

// **** Declaration **** //

const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema(
  {
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
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false }
);

// **** Functions **** //

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;

    const encryptedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = encryptedPassword;
  }

  next();
});

userSchema.pre('save', async function (next) {
  if (this.isNew && this.isModified('email')) {
    const urlOtions = { protocol: 'https', s: 250, rating: 'g', d: 'robohash' };

    const url = gravatar.url(this.email, urlOtions, true);

    this.avatarURL = url;
  }

  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * MongoDB User model
 */
const User = mongoose.model('User', userSchema);

// **** Exports **** //

module.exports = { User };
