import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserHeader from './UserHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
const serverURL = require('../config').serverURL;

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    '&:hover': { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8)' },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PicModal({ pic }) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [spot, setSpot] = useState(null);

  const handleOpen = async (id) => {
    setOpen(true);
    const res = await axios.get(serverURL + `/naturespots/${id}`);
    setSpot(res.data);
  };

  const handleClose = () => {
    setOpen(false);
    setSpot(null);
  };

  return (
    <React.Fragment>
      <CardMedia
        className={classes.media}
        image={pic.url}
        onClick={() => handleOpen(pic.naturespot._id)}
      />
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
          <div className={classes.paper}>
            <Link
              to={{
                pathname: `/details/${pic.naturespot._id}`,
                state: {
                  spot,
                },
              }}
              style={{ textDecoration: 'none' }}
            >
              <Box m={2}>
                <Button variant="outlined" color="secondary">
                  <Typography id="transition-modal-title" variant="h4">
                    {pic.naturespot.title}
                  </Typography>
                  <ArrowForwardIcon />
                </Button>
              </Box>
            </Link>

            <Card key={pic._id} className={classes.root}>
              {'author' in pic && <UserHeader pic={pic} />}

              <CardMedia
                className={classes.media}
                image={pic.url}
                onClick={() => handleOpen(pic.naturespot._id)}
              />
              {/* <CardContent>
                {' '}
                <Typography variant="h5">{pic.naturespot.title}</Typography>
              </CardContent> */}
            </Card>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
