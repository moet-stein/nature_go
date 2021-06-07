import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreePic from '../img/landing_pic.png';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  background: {
    background: ` linear-gradient(
      rgba(0, 0, 0, 0.55), 
      rgba(0, 0, 0, 0.55)
    ),url(${TreePic})`,
    backgroundSize: 'cover',
    height: '100vh',
    color: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonWidth: {
    width: 150,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Box className={classes.background}>
      <Box mt={20} fontWeight={900}>
        <Typography variant="h1"> NATURE GO</Typography>
        <Typography variant="h4">Find 🌿 Share 🌿 Nature</Typography>
      </Box>
      <Box mt={10}>
        <Button
          className={classes.buttonWidth}
          variant="contained"
          color="primary"
        >
          Nature MAP
        </Button>
      </Box>
      <Box mt={4}>
        <Button
          className={classes.buttonWidth}
          variant="contained"
          color="secondary"
        >
          Login / Signup
        </Button>
      </Box>
    </Box>
  );
}
