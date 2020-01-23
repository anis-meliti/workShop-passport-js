const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const passport = require('passport');

const { validationRule, validate } = require('../middlewares/checkValidator');
const User = require('../models/User');
const secretKey = config.get('secretKey');

const Router = express.Router();

Router.post('/register', validationRule(), validate, async (req, res) => {
  const { login, email, password } = req.body;
  try {
    const searchResult = await User.findOne({ login });
    if (searchResult)
      return res.status(400).json({ msg: 'user already exist' });
    const newUser = new User({
      login,
      password,
      email
    });
    bcrypt.genSalt(10, async (err, salt) => {
      if (err) throw err;

      bcrypt.hash(password, salt, async (error, hash) => {
        if (error) throw error;
        try {
          newUser.password = hash;
          const addRes = await newUser.save();
          if (addRes) return res.json(addRes);
        } catch (error) {
          console.error(error);
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.json({ msg: error });
  }
});
Router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  console.log('TCL: req.body', req.body);
  try {
    const searchRes = await User.findOne({ login });
    if (!searchRes)
      return res.status(400).json({ msg: 'bad credentials !!!!!' });
    const isMatch = await bcrypt.compare(password, searchRes.password);
    if (!isMatch) {
      return res.json({ msg: 'bad credentials' });
    }
    const payload = {
      id: searchRes._id,
      login: searchRes.login,
      email: searchRes.email,
      role: searchRes.role
    };
    jwt.sign(payload, secretKey, (err, token) => {
      if (err) throw error;
      res.json({ token: 'Bearer ' + token });
    });
  } catch (error) {
    console.error(error);
  }
});
Router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('TCL: req', req);
    res.json(req.user);
  }
);

module.exports = Router;
