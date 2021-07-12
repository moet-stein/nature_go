import React from 'react';
import ConfirmImg from '../../img/confirm.png';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  confirm: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F5EB',
  },
  imgSize: {
    width: '350px',
  },
}));

export default function ConfirmReg() {
  const classes = useStyles();
  return (
    <Box className={classes.confirm}>
      <Box>
        <Typography variant="h3" color="secondary">
          Thank you for registering!
        </Typography>
      </Box>
      <img className={classes.imgSize} src={ConfirmImg} />
      <Box mt={3}>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button size="large" variant="contained" color="secondary">
            <Typography variant="h5">Login</Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
