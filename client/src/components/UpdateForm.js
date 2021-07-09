import React, { useContext, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import CreateIcon from '@material-ui/icons/Create';
import blue from '@material-ui/core/colors/blue';
import { CommentsContext } from '../context/CommentsContext';
import { NatureSpotsContext } from '../context/NatureSpotsContext';
import { useParams } from 'react-router-dom';
const serverURL = require('../config').serverURL;

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: '400px',
    width: '250px',
  },
  textField: {
    width: '300px',
  },
}));

export default function UpdateForm({ comment, index }) {
  const classes = useStyles();
  let { spotId } = useParams();
  const [oldReview, setOldReview] = useState(comment.comment);
  const [review, setReview] = useState(comment.comment);
  const [oldRating, setOldRating] = useState(comment.rating);
  const [rating, setRating] = useState(comment.rating);
  const {
    commentsArr,
    setCommentsArr,
    avarageRating,
    setAvarageRating,
    writeReview,
    setWriteReview,
    writeUpdate,
    setWriteUpdate,
  } = useContext(CommentsContext);
  const { natureSpots, setNatureSpots, setNewAdded } = useContext(
    NatureSpotsContext
  );

  //   const handleOpen = () => {
  //     setWriteUpdate(true);
  //     console.log(index, comment.comment, comment.rating);
  //   };

  const handleClose = () => {
    setWriteUpdate(false);
  };

  const handleSubmit = async (index) => {
    if (oldReview !== review || oldRating !== rating) {
      let newArr = [...commentsArr];
      newArr[index].comment = review;
      newArr[index].rating = rating;
      await setCommentsArr(newArr);
      const getAve = () => {
        return Number(
          (
            newArr.map((c) => c.rating).reduce((a, b) => a + b, 0) /
            newArr.length
          ).toFixed(1)
        );
      };

      await setAvarageRating(getAve());

      const body = {
        oldReview: oldReview,
        oldRating: oldRating,
        createdAt: comment.createdAt,
        newReview: review,
        newRating: rating,
      };
      const newComment = await axios.post(
        serverURL + '/comments/updatecomment',
        body
      );

      // update rating in naturespot data
      const updateRat = {
        natId: spotId,
        averageRating: getAve(),
      };
      const updatedRating = await axios.post(
        serverURL + '/naturespots/updaterating',
        updateRat
      );

      // update rating in naturespots context (so that user can see updated rating when going back to the page (without fetching ))
      const indexNat = natureSpots.findIndex((s) => s._id === spotId);
      let newSpotsArr = [...natureSpots];
      newSpotsArr[indexNat].rating = getAve();
      await setNatureSpots(newSpotsArr);
    }
    setWriteUpdate(false);
  };

  return (
    <React.Fragment>
      {/* <CreateIcon style={{ color: blue[400] }} onClick={handleOpen} /> */}
      {writeUpdate && (
        <Modal
          aria-labelledby={index}
          //   aria-describedby="transition-modal-description"
          className={classes.modal}
          open={writeUpdate}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={writeUpdate} id={index}>
            <Paper className={classes.paper}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  color="secondary"
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={handleClose}
                >
                  <Typography variant="body2">Cancel</Typography>
                </Button>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                mt={3}
                id={index}
              >
                <Typography variant="h4" color="secondary" id={index}>
                  Update comment
                </Typography>
                <Box m={3} id="transition-modal-description">
                  <TextField
                    className={classes.textField}
                    label="Review"
                    multiline
                    rows={6}
                    defaultValue={comment.comment}
                    variant="outlined"
                    onChange={(e) => setReview(e.target.value)}
                  />
                </Box>
                <Box component="fieldset" borderColor="transparent">
                  <Typography component="legend">Update Rating:</Typography>
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
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSubmit(index)}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Fade>
        </Modal>
      )}
    </React.Fragment>
  );
}
