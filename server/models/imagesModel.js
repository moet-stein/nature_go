const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, 'Image URL cannot be blank'],
    },
    naturespot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NatureSpot',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: Number,
    saved: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model('Image', ImageSchema);
