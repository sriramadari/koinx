const mongoose = require('mongoose');

const prodUri = process.env.PROD_MONGODB_URI; // Use the environment variable for prod
const testUri = process.env.TEST_MONGODB_URI; // Use the environment variable for test

const isDevMode = process.env.NODE_ENV === 'development';

const mongoUri = isDevMode ? testUri : prodUri;
mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on('error', () => {
    console.error('Error connecting to MongoDB');
  });

db.once('open', function () {
  if (isDevMode) {
    console.log('Connected to Test Database');
  } else {
    console.log('Connected to Prod Database');
  }
});

module.exports = db;
