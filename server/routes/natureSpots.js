const router = require('express').Router();
const NatureSpot = require('../models/NatureSpotsModel');
const User = require('../models/UsersModel');
const passport = require('passport');

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
        // select: ['username', 'avatarUrl', 'email'],
      });
    res.status(200).json(natureSpots);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
