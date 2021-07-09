import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NoReview from '../img/noreview.gif';
import Comment from './Comment';
import UpdateForm from './UpdateForm';
import CommentForm from './CommentForm';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import amber from '@material-ui/core/colors/amber';
import CreateIcon from '@material-ui/icons/Create';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { CommentsContext } from '../context/CommentsContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const serverURL = require('../config').serverURL;

const useStyles = makeStyles((theme) => ({
  new: {
    marginTop: theme.spacing(5),
  },
}));

export default function RevContents({ spot }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(AuthContext);
  const {
    commentsArr,
    setCommentsArr,
    avarageRating,
    setAvarageRating,
    writeReview,
    setWriteReview,
    clickedIndex,
  } = useContext(CommentsContext);

  const openWriteReview = () => {
    writeReview ? setWriteReview(false) : setWriteReview(true);
  };

  useEffect(async () => {
    const res = await axios.get(serverURL + `/comments/${spot._id}`);
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
          {!loading && commentsArr.length > 0 && (
            <Box display="flex">
              <Rating
                precision={0.1}
                name="read-only"
                value={avarageRating}
                readOnly
              />
              <Typography color="secondary">{avarageRating}</Typography>
            </Box>
          )}
        </Box>

        {userInfo && Object.keys(userInfo).length !== 0 && (
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
        )}
      </Box>
      {!writeReview && (
        <React.Fragment>
          {!loading &&
            commentsArr &&
            commentsArr.map((comment, index) => (
              <Box mt={4} key={comment._id}>
                <Comment key={comment._id} comment={comment} index={index} />
              </Box>
            ))}
          {!loading && commentsArr.length > 0 && (
            <React.Fragment>
              <UpdateForm
                comment={commentsArr[clickedIndex]}
                index={clickedIndex}
              />
            </React.Fragment>
          )}
          {!loading && commentsArr.length == 0 && (
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              mt={1}
            >
              {userInfo && Object.keys(userInfo).length !== 0 && (
                <Box ml={17} mb={2}>
                  <ArrowUpwardIcon
                    style={{ color: amber[400], fontSize: 60 }}
                  />
                </Box>
              )}
              <Typography color="secondary" variant="h4">
                No Reviews Yet
              </Typography>
              <Box mt={2}>
                <Typography color="secondary" variant="h5">
                  Write a new review!
                </Typography>
              </Box>
              <Box>
                <img alt="no reviews" src={NoReview} width="250" />
              </Box>
              {userInfo && Object.keys(userInfo).length == 0 && (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Box mt={2}>
                    <Button variant="outlined" color="secondary">
                      Login
                    </Button>
                  </Box>
                </Link>
              )}
            </Box>
          )}
        </React.Fragment>
      )}

      {writeReview && <CommentForm spot={spot} />}
    </div>
  );
}
