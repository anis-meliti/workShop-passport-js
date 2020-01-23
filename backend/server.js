const express = require('express');
const passport = require('passport');

const dbConnect = require('./config/dbConnect');
const user = require('./Routes/User');

const passportSetup = require('./middlewares/passport-setup');

const app = express();

app.use(express.json());
app.use(passport.initialize());
passportSetup(passport);
dbConnect();
app.use('/', user);
const PORT = process.env.PORT || 5000;
app.listen(PORT, err =>
  err ? console.error(err) : console.log(`🚀 is running on ${PORT}`)
);
