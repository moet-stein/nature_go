import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../img/avatar1.png';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import teal from '@material-ui/core/colors/teal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Image from '../../img/landing_pic.png';
import HomeIcon from '@material-ui/icons/Home';
import Alert from '@material-ui/lab/Alert';
import { Link, useParams } from 'react-router-dom';
const serverURL = require('../../config').serverURL;

const useStyles = makeStyles(() => ({
  background: {
    background: ` linear-gradient(
      rgba(255, 255, 255, 0.7), 
      rgba(255, 255, 255, 0.7)
    ),url("https://naturego.s3.amazonaws.com/bucketFolder/1626098611678.png")`,
    backgroundSize: 'cover',
    height: '100vh',
    // color: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
  },
  boxSize: {
    width: '350px',
    height: '550px',
    borderRadius: '10px',
    backgroundColor: '#f4f4f4',
  },
  textField: {
    width: '300px',
  },
  teal900: {
    color: teal[900],
    fontWeight: 'bold',
  },
}));

export default function ForgotPass() {
  const classes = useStyles();
  const [newPass, setNewPass] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  let { token } = useParams();

  const handleSubmit = async () => {
    try {
      if (newPass !== confirmPass) {
        return setError('Passwords do not match.');
      }
      const body = { resetLink: token, newPass: newPass };
      const res = await axios.put(serverURL + '/users/resetpassword', body);
      setError('');
      setSent(true);
    } catch (err) {
      console.log(err);
      setError(`Email does not exist`);
    }
  };

  return (
    <div className={classes.background}>
      <Box className={classes.boxSize} mt={10}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box mt={3}>
            <Avatar alt="logo" src={Logo} />
          </Box>
          <Box mt={3} ml={2}>
            <Typography className={classes.teal900} variant="h3">
              Nature Go
            </Typography>
          </Box>
        </Box>
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        {!sent && (
          <React.Fragment>
            <Box mt={3}>
              <Typography color="secondary" variant="h5">
                Reset Password
              </Typography>
            </Box>
            <Box mt={5}>
              <TextField
                id="filled-basic"
                label="Please input your new password"
                variant="filled"
                className={classes.textField}
                onChange={(e) => setNewPass(e.target.value)}
                name="password"
                type="password"
              />
            </Box>
            <Box mt={3}>
              <TextField
                id="filled-basic"
                label="Confirm your new password"
                variant="filled"
                className={classes.textField}
                onChange={(e) => setConfirmPass(e.target.value)}
                name="confirm-password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
              >
                Reset
              </Button>
            </Box>
            <Box mt={4} ml={20}>
              <Link
                to="/"
                className={classes.flex}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<HomeIcon />}
                >
                  Home
                </Button>
              </Link>
            </Box>
          </React.Fragment>
        )}
        {sent && error.length === 0 && (
          <Box mt={10}>
            <Typography variant="h4" color="secondary">
              Successfully Updated!
            </Typography>

            <Box mt={5}>
              <Link
                to="/login"
                className={classes.flex}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<HomeIcon />}
                >
                  Login
                </Button>
              </Link>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
}
