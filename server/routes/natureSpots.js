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

// Update rating number
router.post('/updaterating', async (req, res) => {
  const { natId, averageRating } = req.body;
  try {
    const updatedRating = await NatureSpot.updateOne(
      {
        _id: natId,
      },
      {
        $set: {
          rating: averageRating,
        },
      }
    ).exec();

    res.status(200).json(updatedRating);
  } catch (err) {
    console.log(err);
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
        populate: {
          path: 'author naturespot',
        },

        // select: ['username', 'avatarUrl', 'email'],
      });

    res.status(200).json(natureSpots);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const natureSpot = await NatureSpot.findById(id)
      .populate({
        path: 'user',
        select: ['username', 'avatarUrl', 'email'],
      })
      .populate({
        path: 'images',
        populate: {
          path: 'author naturespot',
        },
      });

    res.status(200).json(natureSpot);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
