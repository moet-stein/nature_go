import React from 'react';
import SavMatImg from './SavMatImg';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import orange from '@material-ui/core/colors/orange';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

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
}));

export default function SavedMatchImgs({ savedArr }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box m={2} display="flex" flexDirection="column" alignItems="center">
        <Typography color="secondary" variant="h6">
          Upload a matching pic to the saved pics!
        </Typography>
        <Box display="flex">
          <Typography color="secondary" variant="h5">
            And get votes
          </Typography>
          <Box mr={1}>
            <SentimentVerySatisfiedIcon style={{ color: orange[500] }} />
          </Box>
          <Typography color="secondary" variant="h5">
            from other users!{' '}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.flexWrap}>
        {savedArr.map((pic, index) => {
          return <SavMatImg key={pic._id} pic={pic} index={index} />;
        })}
      </Box>
    </React.Fragment>
  );
}
