const express = require('express');
const router = express.Router();
const userModel = require('../models/usersModel');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 12;

router.get('/test', (req, res) => {
  res.send({ msg: 'Test route.' });
});

// router
//   .route('/signup')
//   .get(users.renderRegister)
//   .post(catchAsync(users.register));

router.get('/all', (req, res) => {
  userModel.find({}, function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});

// SIGNUP //
// http://localhost:5000/users/
router.post(
  '/',
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    const hash = await bcrypt.hash(req.body.password, saltRounds);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    newUser
      .save()
      .then((user) => {
        res.send('Account succesfully created');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);
module.exports = router;
