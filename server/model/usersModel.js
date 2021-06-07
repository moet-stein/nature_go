const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('User', userSchema);
