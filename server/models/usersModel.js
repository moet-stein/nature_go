const mongoose = require('mongoose');

const savedPicSchema = new mongoose.Schema({
  savedImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image',
  },
  matchedImage: String,
  matching: Number,
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
    myPics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    favoritePics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    savedPics: [savedPicSchema],
    login: Boolean,
  },
  { timestamps: true }
);
module.exports = mongoose.model('User', UserSchema);
