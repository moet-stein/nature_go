const express = require('express');
const router = express.Router();
const User = require('../models/UsersModel');
const NatureSpot = require('../models/NatureSpotsModel');
const Image = require('../models/ImagesModel');

// Add Image to a spot
router.post('/uploadimage', async (req, res) => {
  const { url, natureId, authorId } = req.body;
  try {
    const newImage = new Image({
      url: url,
      naturespot: natureId,
      author: authorId,
      likes: 0,
      saved: 0,
    });
    const user = await newImage.save();

    const myPic = await User.updateOne(
      { _id: authorId },
      {
        $push: {
          myPics: user._id,
        },
      },
      { new: true, upsert: true }
    ).exec();
    res.status(200).json({ newImage: newImage, myPic: myPic });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
