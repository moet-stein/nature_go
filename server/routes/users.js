require('dotenv').config();
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const secretOrKey = require('../keys').secretOrKey;
const secretOrKey2 = require('../keys').secretOrKey2;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');
// mailgun
// const mailgun = require('mailgun-js');
// const DOMAIN = 'sandbox53fe7162191a4212be7ee0862b0b235d.mailgun.org';
// const mg = mailgun({ apiKey: process.env.MAILGUN_API, domain: DOMAIN });
const _ = require('lodash');
// nodemailer
const nodemailer = require('nodemailer');

const User = require('../models/usersModel');

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
          res.status(500).json({ error: err });
        }
        if (user) {
          res.status(500).send('Email is already used');
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
            // resetLink: {
            //   data: "String",
            //   default: '',
            // },
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
        console.log(result, 'result');
        if (err) {
          console.log(err);
          res.status(400).json({ errors: err });
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

// update
router.post(
  '/updateprofile',
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  async (req, res) => {
    const { userId, avatarUrl, username, email, oldEmail } = req.body;
    try {
      User.findOne({ email: email }, async (err, user) => {
        if (err) {
          res.json({ error: err });
        }
        if (user && email !== oldEmail) {
          res.status(500).send('Email is already used');
        } else {
          // express validator
          const errors = await validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          } else {
            const updatedUser = User.updateOne(
              { _id: userId },
              {
                $set: {
                  username: username,
                  avatarUrl: avatarUrl,
                  email: email,
                },
              },
              { new: true, upsert: true }
            ).exec();

            res.status(200).json(updatedUser);
          }
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  }
);

// forgot password route (send email with link)
router.put('/forgotpassword', (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: 'User with this email does not exist.' });
    }

    const options = {
      id: user._id,
    };
    const token = jwt.sign(options, secretOrKey2, { expiresIn: '20m' });

    // const data = {
    //   from: 'noreply@naturego.com',
    //   to: email,
    //   subject: 'Reset Password Link',
    //   html: `<h2>Please click the given link to reset your password.</h2><p>http://localhost:3000/resetpassword/${token}</p>`,
    // };
    // node mailer
    const smtpData = {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASS,
      },
    };
    const transporter = nodemailer.createTransport(smtpData);

    const url =
      `http://nature-go.netlify.app/resetpassword//${token}` ||
      `http://localhost:3000/resetpassword/${token}`;

    // const getUrl = (token) => {
    //   if (process.env.PORT === 'https://nature-go-app.herokuapp.com/') {
    //     url = `http://nature-go.netlify.app/resetpassword//${token}`;
    //   } else {
    //     url = `http://localhost:3000/resetpassword/${token}`;
    //   }
    // };
    // getUrl(token);

    // setup e-mail data with unicode symbols
    const mailOptions = {
      from: '"Nature Go" <noreply@naturego.com>', // sender address
      to: email, // list of receivers
      subject: 'Nature Go: Reset Password Link', // Subject line
      text: 'Reset your password', // plaintext body
      html: `<h2>Please click the given link to reset your password.</h2><p>${url}</p>`, // html body
    };
    console.log(url);

    return user.updateOne({ resetLink: token }, function (err, success) {
      if (err) {
        return res.status(400).json({ error: 'Reset Password Link Error.' });
      } else {
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            return res.json({
              error: error,
            });
          }
          return res.json({
            message: 'Email has been sent, kindly follow the instrunctions',
          });
        });
        // mg.messages().send(data, function (error, body) {
        //   if (error) {
        //     return res.json({
        //       error: err.message,
        //     });
        //   }
        //   return res.json({
        //     message: 'Email has been sent, kindly follow the instrunctions',
        //   });
        // });
      }
    });
  });
});

// reset password route
router.put('/resetpassword', (req, res) => {
  const { resetLink, newPass } = req.body;

  if (resetLink) {
    jwt.verify(resetLink, secretOrKey2, function (err, decodedData) {
      if (err) {
        return res.status(401).json({
          error: 'Incorrect token or it is expired',
        });
      }
      User.findOne({ resetLink }, async (err, user) => {
        if (err || !user) {
          return res
            .status(400)
            .json({ error: 'User with this token does not exist.' });
        }

        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);

        const obj = {
          password: hashedPassword,
          resetLink: '',
        };

        user = _.extend(user, obj);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: 'reset password error' });
          } else {
            return res.json({ message: 'Your password has been changed. ' });
          }
        });
      });
    });
  } else {
    return res.send.status(401).json({ error: 'Authentication error!' });
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

// increase matching number

// give smile (matching) to other user
router.post('/givematching', async (req, res) => {
  const { userToGet, userToGive, savPicId } = req.body;
  try {
    const updatedMatching = await User.updateOne(
      { _id: userToGet, 'savedPics._id': savPicId },
      {
        $push: {
          'savedPics.$.matching': userToGive,
        },
      },
      { new: true, upsert: true }
    ).exec();
    res.status(200).json(updatedMatching);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get back matching from other user
// give smile (matching) to other user
router.post('/getbackmatching', async (req, res) => {
  const { getBackFrom, userToGetBack, savPicId } = req.body;
  try {
    const updatedMatching = await User.updateOne(
      { _id: getBackFrom, 'savedPics._id': savPicId },
      {
        $pull: {
          'savedPics.$.matching': userToGetBack,
        },
      },
      { new: true, upsert: true }
    ).exec();
    res.status(200).json(updatedMatching);
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
  async (req, res) => {
    const userInfo = {
      _id: req.user._id,
      email: req.user.email,
      avatarUrl: req.user.avatarUrl,
      username: req.user.username,
      myPics: req.user.myPics,
      favoritePics: req.user.favoritePics,
      savedPics: req.user.savedPics,
    };
    const user = await User.findById(req.user._id)
      .populate({
        path: 'myPics',
        select: ['url', 'naturespot', '_id', 'likes', 'saved'],
        populate: { path: 'naturespot', select: ['_id', 'title'] },
      })
      .populate({
        path: 'favoritePics',
        select: ['url', '_id', 'author'],
        populate: { path: 'author', select: ['_id', 'avatarUrl', 'username'] },
      });
    // .populate({
    //   path: 'favoritePics',
    //   populate: { path: 'naturespot', select: ['_id', 'title'] },
    // });
    res.status(200).json(user);
    // res.send(userInfo);
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

// {savedpic imageObjectI, matchingpic: url, matching: Boolean}
module.exports = router;
