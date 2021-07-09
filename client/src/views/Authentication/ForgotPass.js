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
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  background: {
    background: ` linear-gradient(
      rgba(255, 255, 255, 0.7), 
      rgba(255, 255, 255, 0.7)
    ),url(${Image})`,
    backgroundSize: 'cover',
    height: '100vh',
    // color: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
  },
  boxSize: {
    width: '350px',
    height: '400px',
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
  const [email, setEmail] = useState(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const body = { email: email };
      const res = await axios.put('/users/forgotpassword', body);
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
            <Typography className={classes.teal900} variant="h2">
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
            <Box mt={2}>
              <Typography color="secondary" variant="h3">
                Reset Password
              </Typography>
            </Box>
            <Box mt={5}>
              <TextField
                id="filled-basic"
                label="Please enter your email"
                variant="filled"
                className={classes.textField}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mt={4}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color="secondary"
              >
                Send Email
              </Button>
            </Box>
            <Box mt={8} ml={20}>
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
        {sent && !error && (
          <Box mt={4}>
            <Typography variant="h3" color="secondary">
              Email sent successfully!
            </Typography>
            <Typography variant="h5" color="primary">
              Please check your email and click the link to change the password.
            </Typography>
            <Box
              mt={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box mb={3}>
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
              <Link
                to="/login"
                className={classes.flex}
                style={{ textDecoration: 'none' }}
              >
                <Button variant="outlined" color="secondary">
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
