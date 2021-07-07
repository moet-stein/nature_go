import React, { useEffect, useContext } from 'react';
import ComContents from './ComContents';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
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
    height: '500px',
    width: '300px',
  },
}));

export default function Comments({ spot }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setWriteReview } = useContext(CommentsContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setWriteReview(false);
  };

  useEffect(() => {
    console.log(spot);
  }, []);

  return (
    <Box>
      <Button variant="outlined" onClick={handleOpen}>
        Reviews
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper
            className={classes.paper}
            style={{ maxHeight: 500, overflow: 'auto' }}
          >
            <Box display="flex" justifyContent="flex-end">
              <CloseIcon onClick={handleClose} />
            </Box>
            <ComContents spot={spot} />
          </Paper>
        </Fade>
      </Modal>
    </Box>
  );
}
