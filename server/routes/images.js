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
    const pic = await newImage.save();

    const myPic = await User.updateOne(
      { _id: authorId },
      {
        $push: {
          myPics: pic._id,
        },
      },
      { new: true, upsert: true }
    ).exec();

    const naturePic = await NatureSpot.updateOne(
      { _id: natureId },
      {
        $push: {
          images: pic._id,
        },
      },
      { new: true, upsert: true }
    ).exec();

    res.status(200).json({ newImage: pic, myPic: myPic, naturePic: naturePic });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add Favroite Image to a spot
router.post('/addfavorite', async (req, res) => {
  const { imageId, userId } = req.body;

  try {
    const increaseLikes = await Image.updateOne(
      { _id: imageId },
      { $inc: { likes: 1 } },
      { new: true, upsert: true }
    ).exec();

    const favPic = await User.updateOne(
      { _id: userId },
      {
        $push: {
          favoritePics: imageId,
        },
      },
      { new: true, upsert: true }
    ).exec();

    res.status(200).json({ favPic: favPic, increaseLikes: increaseLikes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// dislike the image (post)
router.post('/removefavorite', async (req, res) => {
  const { imageId, userId } = req.body;

  try {
    const decreaseLikes = await Image.updateOne(
      { _id: imageId },
      { $inc: { likes: -1 } },
      { new: true, upsert: true }
    ).exec();

    const removedFavPic = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          favoritePics: imageId,
        },
      }
    ).exec();

    res
      .status(200)
      .json({ removedFavPic: removedFavPic, decreaseLikes: decreaseLikes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// save image (post)

// Unsave the image (post)

module.exports = router;
