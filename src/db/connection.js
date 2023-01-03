const mongoose = require('mongoose');
// TODO: extract to .env mongoDB URI

/**
 * Mongoose connection to MongoDB
 * @async
 * @returns connection to the DB
 */
const connectMongo = async () => {
  mongoose.set('strictQuery', true);
  return await mongoose.connect(
    process.env.MONGO_CONNECTION_URI
  );
};

module.exports = {
  connectMongo,
};
