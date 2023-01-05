const mongoose = require('mongoose');

const envVariables = require('../utils/envVariables');

const URI = envVariables.MONGO_CONNECTION_URI;

/**
 * Mongoose connection to MongoDB
 * @async
 * @returns connection to the DB
 */
const connectMongo = async () => {
  mongoose.set('strictQuery', true);
  return await mongoose.connect(URI);
};

module.exports = {
  connectMongo,
};
