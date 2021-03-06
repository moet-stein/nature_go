const mongoose = require('mongoose');

const NatureSpotSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      require: true,
      min: 3,
    },
    desc: {
      type: String,
      require: true,
      min: 3,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      require: true,
    },
    long: {
      type: Number,
      require: true,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  },
  { timestamps: true }
);
module.exports = mongoose.model('NatureSpot', NatureSpotSchema);
