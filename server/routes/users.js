const express = require('express');
const router = express.Router();
const User = require('../models/UsersModel');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const secretOrKey = require('../keys').secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');

// router.get('/all', (req, res) => {
//   User.find({}, function (err, users) {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(users);
//     }
//   });
// });

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
  User.findOne({ email: email }, (err, user) => {
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
  // try {
  //   // find user
  //   const user = await User.findOne({ email: req.body.email });
  //   !user && res.status(400).json('Wrong email or password');

  //   // validate password
  //   const validPassword = await bcrypt.compare(
  //     req.body.password,
  //     user.password
  //   );
  //   !validPassword && res.status(400).json('Wrong email or password');
  //   // send res
  //   res.status(200).json({ _id: user._id, username: user.username });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user);
    res.send(req.user);
  }
);

// Add Favroite Image to a spot
router.post('/favorite', async (req, res) => {
  const { url, user, author, natureSpot } = req.body;
  try {
    const favPic = await User.updateOne(
      { _id: user },
      {
        $push: {
          favoritePics: {
            url: url,
            natureSpot: natureSpot,
            author: author,
          },
        },
      },
      { new: true, upsert: true }
    ).exec();
    res.status(200).json(favPic);
  } catch (err) {
    res.status(500).json(err);
  }
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

module.exports = router;
