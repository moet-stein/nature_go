import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreePic from '../img/landing_pic.png';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  background: {
    background: ` linear-gradient(
      rgba(0, 0, 0, 0.55), 
      rgba(0, 0, 0, 0.55)
    ),url("https://naturego.s3.amazonaws.com/bucketFolder/1626098611678.png")`,
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
        <Link to="/naturespots" style={{ textDecoration: 'none' }}>
          <Button
            className={classes.buttonWidth}
            variant="contained"
            color="primary"
          >
            Nature MAP
          </Button>
        </Link>
      </Box>
      <Box mt={4}>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button
            className={classes.buttonWidth}
            variant="contained"
            color="secondary"
          >
            Login / Signup
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
