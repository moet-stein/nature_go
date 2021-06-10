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
// Get all spots
router.get('/', async (req, res) => {
  try {
    const natureSpots = await NatureSpot.find();
    res.status(200).json(natureSpots);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;