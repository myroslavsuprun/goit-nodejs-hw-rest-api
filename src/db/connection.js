const mongoose = require('mongoose');

/**
 * Mongoose connection to MongoDB
 * @async
 * @returns connection to the DB
 */
const connectMongo = async () => {
  mongoose.set('strictQuery', true);
  return await mongoose.connect(
    'mongodb+srv://myroslavsurpun:qwerty123@cluster0.b5n2wdr.mongodb.net/db-contacts'
  );
};

module.exports = {
  connectMongo,
};
