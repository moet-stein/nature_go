import React from 'react';
import SavMatImg from './SavMatImg';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';

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
      <Box className={classes.flexWrap}>
        {savedArr.map((pic, index) => {
          return <SavMatImg pic={pic} index={index} />;
        })}
      </Box>
    </React.Fragment>
  );
}
