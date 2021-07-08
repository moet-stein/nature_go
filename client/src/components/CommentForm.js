import React, { useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../context/AuthContext';
import { CommentsContext } from '../context/CommentsContext';
import { NatureSpotsContext } from '../context/NatureSpotsContext';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '300px',
  },
}));

export default function CommentForm({ spot }) {
  const classes = useStyles();
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(3);
  const { userInfo } = useContext(AuthContext);
  const {
    commentsArr,
    setCommentsArr,
    avarageRating,
    setAvarageRating,
    writeReview,
    setWriteReview,
  } = useContext(CommentsContext);
  const { natureSpots, setNatureSpots, setNewAdded } = useContext(
    NatureSpotsContext
  );

  const submitForm = async () => {
    console.log(review, rating, userInfo._id, spot._id);
    const body = {
      naturespot: spot._id,
      author: userInfo._id,
      comment: review,
      rating: rating,
    };
    const newComment = await axios.post('/comments/newcomment', body);

    //   Add new comment to the array in context
    const newComToShow = {
      naturespot: spot._id,
      author: {
        avatarUrl: userInfo.avatarUrl,
        username: userInfo.username,
        _id: userInfo._id,
      },
      comment: review,
      rating: rating,
      createdAt: new Date().toISOString(),
    };
    await setCommentsArr((oldArr) =>
      [...oldArr.reverse(), newComToShow].reverse()
    );
    const newArr = [...commentsArr, newComToShow];

    //   get average rating
    const getAve = () => {
      return Number(
        (
          newArr.map((c) => c.rating).reduce((a, b) => a + b, 0) / newArr.length
        ).toFixed(1)
      );
    };
    console.log(getAve());
    await setAvarageRating(getAve());

    //   Update naturespot rating
    const updateRat = {
      natId: spot._id,
      averageRating: getAve(),
    };
    const updatedRating = await axios.post(
      '/naturespots/updaterating',
      updateRat
    );

    // update rating in naturespots context (so that user can see updated rating when going back to the page (without fetching ))
    const indexNat = natureSpots.findIndex((s) => s._id === spot._id);
    let newSpotsArr = [...natureSpots];
    newSpotsArr[indexNat].rating = getAve();
    await setNatureSpots(newSpotsArr);

    await setWriteReview(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box m={2} mt={4}>
        <Typography variant="h4"> Review Form</Typography>
      </Box>
      <TextField
        className={classes.textField}
        id="outlined-multiline-static"
        label="Review"
        multiline
        rows={6}
        defaultValue="Write here"
        variant="outlined"
        onChange={(e) => setReview(e.target.value)}
      />
      <Box component="fieldset" mt={3} borderColor="transparent">
        <Typography component="legend">Give Rating:</Typography>
        <Rating
          precision={0.5}
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </Box>
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={submitForm}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}
