const express = require('express');
const router = express.Router();
const User = require('../models/UsersModel');
const NatureSpot = require('../models/NatureSpotsModel');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const secretOrKey = require('../keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');

// SIGNUP //
// http://localhost:5000/users/
router.post(
  '/register',
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    try {
      User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
          res.json({ error: err });
        }
        if (user) {
          res.send('Email is already used');
        } else {
          // express validator
          const errors = await validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          // generate new password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);

          // create new user
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            avatarUrl: req.body.avatarUrl,
            myPics: [],
            favoritePics: [],
            savedPics: [],
            login: false,
          });

          //  save user and send response
          const user = await newUser.save();
          res.status(200).json(user._id);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// login
router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.send('Email does not exist');
    } else {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log(result);
        if (err) {
          res.send(err);
        }
        if (result) {
          const options = {
            id: user._id,
          };
          const token = jwt.sign(options, secretOrKey, { expiresIn: '30d' });

          console.log(token);
          res.json({
            success: true,
            token: token,
          });
        } else {
          res.send('password does not match');
        }
      });
    }
  });
  if (user) {
    user.login = true;
    await user.save();
  }
});

// logout
router.post('/logout', async (req, res) => {
  const id = req.body._id;
  await User.findOneAndUpdate({ _id: id }, { $set: { login: false } });
});

// Add Saved Image to a spot
router.post('/saved', async (req, res) => {
  const { url, user, author, natureSpot } = req.body;
  try {
    const savePic = await User.updateOne(
      { _id: user },
      {
        $push: {
          savedPics: {
            url: url,
            natureSpot: natureSpot,
            author: author,
            matchedPic: '',
          },
        },
      },
      { new: true, upsert: true }
    ).exec();
    res.status(200).json(savePic);
  } catch (err) {
    res.status(500).json(err);
  }
});
// matching photo (post route) for saved page
router.post('/uploadmatching', async (req, res) => {
  const { user, picId, url } = req.body;
  try {
    const matchingPic = await User.updateOne(
      { _id: user, 'savedPics._id': picId },
      {
        $set: {
          'savedPics.$.matchedImage': url,
        },
      },
      { new: true, upsert: true }
    ).exec();
    res.status(200).json(matchingPic);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ****************GET ROUTE*******************//

// profile
router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userInfo = {
      _id: req.user._id,
      avatarUrl: req.user.avatarUrl,
      username: req.user.username,
      myPics: req.user.myPics,
      favoritePics: req.user.favoritePics,
      savedPics: req.user.savedPics,
    };
    console.log(userInfo);
    res.send(userInfo);
  }
);

// mypics & favorites (get route) for mypage
router.get('/myfavpics/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate({
        path: 'myPics',
        select: ['url', 'naturespot', '_id', 'likes', 'saved'],
        populate: { path: 'naturespot', select: ['_id', 'title'] },
      })
      .populate({
        path: 'favoritePics',
        select: ['url', '_id', 'author'],
        populate: { path: 'author', select: ['_id', 'avatarUrl', 'username'] },
      })
      .populate({
        path: 'favoritePics',
        populate: { path: 'naturespot', select: ['_id', 'title'] },
      });

    const myFavPics = {
      _id: user._id,
      myPics: user.myPics,
      favoritePics: user.favoritePics,
    };

    res.status(200).json(myFavPics);
  } catch (err) {
    res.status(500).json(err);
  }
});

// saved (get route) for saved page
router.get('/savedpics/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate({
      path: 'savedPics',
      populate: { path: 'savedImage', populate: { path: 'naturespot' } },
    });

    const savedPics = {
      _id: user._id,
      savedPics: user.savedPics,
    };

    res.status(200).json(savedPics);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get mypics & saved pics to see other user (get route)
router.get(
  '/otheruser/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id)
        .populate({
          path: 'savedPics',
          populate: { path: 'savedImage', populate: { path: 'naturespot' } },
        })
        .populate({
          path: 'myPics',
        });

      const savedPics = {
        _id: user._id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        myPics: user.myPics,
        savedPics: user.savedPics,
      };

      res.status(200).json(savedPics);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// increase matching number

// {savedpic imageObjectI, matchingpic: url, matching: Boolean}
module.exports = router;
