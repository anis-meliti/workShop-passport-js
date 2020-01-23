const mongoose = require('mongoose');
const config = require('config');

const mongoUri = config.get('mongoURI');

const dbConnect = () =>
  mongoose.connect(
    mongoUri,
    { useUnifiedTopology: true, useNewUrlParser: true },
    err => (err ? console.error(err) : console.log('db is connected ....'))
  );

module.exports = dbConnect;
