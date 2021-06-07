const express = require('express');
const router = express.Router();
const userModel = require('../model/usersModel');

// router.get('/test', (req, res) => {
//   res.send({ msg: 'Test route.' });
// });

router.get('/all', (req, res) => {
  userModel.find({}, function (err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});
module.exports = router;
