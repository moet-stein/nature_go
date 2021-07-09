const express = require('express');
const router = express.Router();
const Comment = require('../models/commentsModel');

// post new comment
router.post('/newcomment', async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const saveCom = await newComment.save();
    res.status(200).json(saveCom);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete comment
router.post('/deletecomment', async (req, res) => {
  const { comment, createdAt } = req.body;
  try {
    const deletedComment = await Comment.deleteOne({
      comment: comment,
      createdAt: createdAt,
    }).exec();

    res.status(200).json(deletedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update comment
router.post('/updatecomment', async (req, res) => {
  const { oldReview, oldRating, createdAt, newReview, newRating } = req.body;
  try {
    const updatedComment = await Comment.updateOne(
      {
        comment: oldReview,
        rating: oldRating,
      },
      {
        $set: {
          comment: newReview,
          rating: newRating,
        },
      }
    ).exec();

    res.status(200).json(updatedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// ***************************GET*********************

// get comments for the naturespot
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({ naturespot: id }).populate({
      path: 'author',
      select: ['username', 'avatarUrl', '_id'],
    });

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
