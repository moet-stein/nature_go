import React, { useContext, useState } from 'react';
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
import { CommentsContext } from '../context/CommentsContext';

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

export default function UpdateForm({ comment }) {
  const classes = useStyles();
  const [review, setReview] = useState(comment.comment);
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

  const handleClose = () => {
    setWriteUpdate(false);
  };

  const handleUpdate = () => {};

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={writeUpdate}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={writeUpdate}>
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
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <Typography variant="h4" color="secondary">
              Update comment
            </Typography>
            <Box m={3}>
              <TextField
                className={classes.textField}
                id="outlined-multiline-static"
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
              <Button variant="contained" color="secondary">
                Update
              </Button>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
}
