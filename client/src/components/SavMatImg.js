import React, { useContext, useState, useEffect } from 'react';
import SavLink from './SavLink';
import SavFooter from './SavFooter';
import { SavedArrContext } from '../context/SavedArrContext';
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
    width: '350px',
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

export default function SavMatImg({ pic, index }) {
  const classes = useStyles();
  const { spotsArr } = useContext(SavedArrContext);
  const [yourPic, setYourPic] = useState(false);

  const togglePics = () => {
    yourPic ? setYourPic(false) : setYourPic(true);
  };
  useEffect(() => {
    console.log(pic);
  }, []);

  return (
    <Box m={3} className={classes.cardWidth}>
      <Card key={pic._id} className={classes.root}>
        <Paper>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            ml={2}
          >
            <SavLink pic={pic} spot={spotsArr[index]} />
          </Box>
        </Paper>

        {!yourPic ? (
          <CardMedia className={classes.media} image={pic.originalImage} />
        ) : (
          <CardMedia className={classes.media} image={pic.matchedImage} />
        )}

        <CardContent>
          {pic.matchedImage.length > 0 && (
            <Box>
              <Box display="flex" justifyContent="flex-start">
                {!yourPic ? (
                  <Typography color="primary" variant="body2">
                    Original Pic{' '}
                  </Typography>
                ) : (
                  <Typography color="primary" variant="body2">
                    Your Matching Pic
                  </Typography>
                )}
              </Box>
              <Button variant="outlined" color="secondary" onClick={togglePics}>
                Flip
              </Button>
            </Box>
          )}
          <SavFooter saved={pic} />
        </CardContent>
      </Card>
    </Box>
  );
}
