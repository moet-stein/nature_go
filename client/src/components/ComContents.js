import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Comment from './Comment';
import CommentForm from './CommentForm';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import { CommentsContext } from '../context/CommentsContext';

const useStyles = makeStyles((theme) => ({
  new: {
    marginTop: theme.spacing(5),
  },
}));

export default function RevContents({ spot }) {
  const classes = useStyles();
  const [ratingValue, setRatingValue] = useState(4.2);
  const [loading, setLoading] = useState(true);
  const {
    commentsArr,
    setCommentsArr,
    avarageRating,
    setAvarageRating,
    writeReview,
    setWriteReview,
  } = useContext(CommentsContext);

  const openWriteReview = () => {
    writeReview ? setWriteReview(false) : setWriteReview(true);
    console.log('write review');
  };

  useEffect(async () => {
    const res = await axios.get(`/comments/${spot._id}`);
    await setCommentsArr(res.data.reverse());
    console.log(res.data);
    const sumRating = res.data.map((c) => c.rating).reduce((a, b) => a + b, 0);
    const average = sumRating / res.data.length;
    setAvarageRating(Number(average.toFixed(1)));
    setLoading(false);
  }, []);
  return (
    <div>
      <Box display="flex" justifyContent="space-around">
        <Box>
          <Typography color="secondary" variant="h4">
            Reviews
          </Typography>
          <Typography color="primary" variant="body2">
            {spot.title}
          </Typography>
          <Box display="flex">
            <Rating
              precision={0.1}
              name="read-only"
              value={ratingValue}
              readOnly
            />
            <Typography color="secondary">{avarageRating}</Typography>
          </Box>
        </Box>

        <Box className={classes.new}>
          {!writeReview ? (
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<CreateIcon />}
              onClick={openWriteReview}
            >
              <Typography variant="body2">New</Typography>
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={openWriteReview}
            >
              <Typography variant="body2">Cancel</Typography>
            </Button>
          )}
        </Box>
      </Box>
      {!writeReview && (
        <React.Fragment>
          {!loading &&
            commentsArr &&
            commentsArr.map((comment) => (
              <Box mt={4}>
                <Comment key={comment._id} comment={comment} />
              </Box>
            ))}
        </React.Fragment>
      )}

      {writeReview && <CommentForm spot={spot} />}
    </div>
  );
}
