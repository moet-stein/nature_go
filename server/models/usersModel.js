const mongoose = require('mongoose');

const myPicSchema = new mongoose.Schema({
  url: String,
  naturespot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Naturespot',
  },
});

const favoritePicSchema = new mongoose.Schema({
  url: String,
  naturespot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'naturespot',
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const savedPicSchema = new mongoose.Schema({
  url: String,
  naturespot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Naturespot',
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  matchedPic: String,
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username cannot be blank'],
    },
    email: {
      type: String,
      required: [true, 'Email cannot be blank'],
    },
    password: {
      type: String,
      required: [true, 'Password cannot be blank'],
    },
    avatarUrl: { type: String, required: [true, 'Avatar cannot be blank'] },
    myPics: [myPicSchema],
    favoritePics: [favoritePicSchema],
    savedPics: [savedPicSchema],
    login: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);
