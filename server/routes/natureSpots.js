const router = require('express').Router();
const NatureSpot = require('../models/NatureSpotsModel');

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

// Add Image to a spot
router.post('/:id', async (req, res) => {
  const { id, url, author, likes, saved } = req.body;
  try {
    const natureSpot = await NatureSpot.updateOne(
      { _id: id },
      {
        $push: {
          images: { url: url, author: author, likes: likes, saved: saved },
        },
      },
      { new: true, upsert: true }
    ).exec();
    res.status(200).json(natureSpot);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
