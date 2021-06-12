const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// login
router.post('/login', async (req, res) => {
  try {
    // find user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json('Wrong email or password');

    // validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json('Wrong email or password');

    // send res
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
