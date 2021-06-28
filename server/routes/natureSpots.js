const router = require('express').Router();
const NatureSpot = require('../models/NatureSpotsModel');
const User = require('../models/UsersModel');
const passport = require('passport');

// router.get(
//   '/profile',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     console.log(req.user);
//     res.send(req.user);
//   }
// );

// Create spot
router.post('/', async (req, res) => {
  const newSpot = new NatureSpot(req.body);
  try {
    const savedSpot = await newSpot.save();
    res.status(200).json(savedSpot);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Increase Like
// THIS DOES NOT WORK
// It doesn't update the number in the object in the array of the docment
// This post request creates a new document in the collection
// router.post('/increaselike', async (req, res) => {
//   const { parkId, picId } = req.body;
//   try {
//     const likedPic = await NatureSpot.findOneAndUpdate(
//       { _id: parkId, 'images._id': picId },
//       { $inc: { 'images.$.likes': 1 } }
//     );
//     res.status(200).json(likedPic);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// **************************GET*************************//
// Get all spots
router.get('/', async (req, res) => {
  try {
    const natureSpots = await NatureSpot.find({})
      .populate({
        path: 'user',
        select: ['username', 'avatarUrl', 'email'],
      })
      .populate({
        path: 'images',
        populate: {
          path: 'author',
          select: ['username', 'avatarUrl', 'email'],
        },
      });
    res.status(200).json(natureSpots);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
