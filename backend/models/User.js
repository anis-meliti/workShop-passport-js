const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: String,
  role: ['admin', 'user']
});
module.exports = User = mongoose.model('user', userSchema);
