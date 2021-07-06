import React, { useState, useEffect } from 'react';
import SavLink from './SavLink';
import axios from 'axios';
import OtherUserFooter from './OtherUserFooter';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(() => ({
  cardWidth: {
    width: '330px',
  },
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
}));

export default function OtherUserImgs({ pic, index }) {
  const classes = useStyles();
  const [spot, setSpot] = useState(null);
  // const {  } = useContext(SavedArrContext);
  const [original, setOriginal] = useState(true);
  const [loading, setLoading] = useState(true);

  const togglePics = () => {
    original ? setOriginal(false) : setOriginal(true);
  };

  useEffect(async () => {
    const res = await axios.get(`/naturespots/${pic.natureSpotId}`);
    setSpot(res.data);
    setLoading(false);
  }, []);

  return (
    <Box m={3} className={classes.cardWidth}>
      <Card key={pic._id} className={classes.root}>
        {!loading && (
          <Paper>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              ml={2}
            >
              <SavLink pic={pic} spot={spot} />
            </Box>
          </Paper>
        )}

        {original ? (
          <CardMedia className={classes.media} image={pic.originalImage} />
        ) : (
          <CardMedia className={classes.media} image={pic.matchedImage} />
        )}

        <CardContent>
          <Box>
            <Box display="flex" justifyContent="flex-start">
              {original ? (
                <Typography color="primary" variant="body2">
                  Original Pic{' '}
                </Typography>
              ) : (
                <Typography color="primary" variant="body2">
                  Matching Pic
                </Typography>
              )}
            </Box>
            <Button variant="outlined" color="secondary" onClick={togglePics}>
              Flip
            </Button>
          </Box>
          <OtherUserFooter pic={pic} index={index} />
        </CardContent>
      </Card>
    </Box>
  );
}
