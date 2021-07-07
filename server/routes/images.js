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
  const { imageId, imageUrl, userId } = req.body;

  try {
    const decreaseLikes = await Image.updateOne(
      { url: imageUrl },
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
router.post('/addsaved', async (req, res) => {
  const { natureSpotId, userId, origUrl } = req.body;

  try {
    const increaseSaved = await Image.updateOne(
      { url: origUrl },
      { $inc: { saved: 1 } },
      { new: true, upsert: true }
    ).exec();

    const savedPicObj = {
      natureSpotId: natureSpotId,
      matchedImage: '',
      matching: [],
      originalImage: origUrl,
    };

    const savedPic = await User.updateOne(
      { _id: userId },
      {
        $push: {
          savedPics: savedPicObj,
        },
      },
      { new: true, upsert: true }
    ).exec();

    res.status(200).json({ savedPic: savedPic, increaseSaved: increaseSaved });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Unsave the image (post)
router.post('/removesaved', async (req, res) => {
  const { userId, origUrl } = req.body;

  try {
    const decreaseSaved = await Image.updateOne(
      { url: origUrl },
      { $inc: { saved: -1 } },
      { new: true, upsert: true }
    ).exec();

    const removedSavedPic = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          savedPics: { originalImage: origUrl },
        },
      }
    ).exec();

    res
      .status(200)
      .json({ removedSavedPic: removedSavedPic, decreaseSaved: decreaseSaved });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete mypics (from images collection & from myPics in user collection & from every user's favorites & naturespot image)
router.post('/deletemypic', async (req, res) => {
  const { imageId, userId, natureSpotId } = req.body;

  try {
    const imgCol = await Image.deleteOne({ _id: imageId });

    const myPic = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          myPics: imageId,
        },
      }
    ).exec();

    const natSpot = await NatureSpot.updateOne(
      { _id: natureSpotId },
      {
        $pull: {
          images: imageId,
        },
      }
    );

    // {
    //   $in: [ObjectId('5e47a5e81627c0c63e7dba92')];
    // }

    const removeFavs = await User.updateMany(
      {},
      {
        $pull: {
          favoritePics: { $in: imageId },
        },
      },
      { upsert: true }
    );

    // const removeFavs = await User.updateMany(
    //   {},
    //   { $pull: { 'favoritePics.$[element]': imageId } },
    //   { multi: true, arrayFilters: [{ element: { $eq: imageId } }] }
    // );

    res.status(200).json({ imgCol, myPic, natSpot, removeFavs });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ****************************GET***************************//
// get images with nature spot id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const images = await Image.find({
      naturespot: id,
    }).populate({
      path: 'author',
      select: ['username', 'avatarUrl'],
    });

    res.status(200).json(images);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
