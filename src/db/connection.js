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
    'mongodb+srv://myroslavsurpun:Nikos2003@cluster0.b5n2wdr.mongodb.net/db-contacts'
  );
};

module.exports = {
  connectMongo,
};
