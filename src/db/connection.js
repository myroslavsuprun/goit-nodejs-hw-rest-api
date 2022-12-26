const mongoose = require('mongoose');

const connectMongo = async () => {
  mongoose.set('strictQuery', true);
  return await mongoose.connect(
    'mongodb+srv://myroslavsurpun:Nikos2003@cluster0.b5n2wdr.mongodb.net/db-contacts'
  );
};

module.exports = {
  connectMongo,
};
