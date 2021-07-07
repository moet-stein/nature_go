const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    naturespot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NatureSpot',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: String,
    rating: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model('Comment', CommentSchema);
