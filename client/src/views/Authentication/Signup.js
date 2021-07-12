import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Logo from '../../img/avatar1.png';
import Room from '@material-ui/icons/Room';
import DefaultAvatar from '../../img/avatar1.png';
import Image from '../../img/landing_pic.png';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { useAuth } from '../context/AuthContext';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
const serverURL = require('../../config').serverURL;

const useStyles = makeStyles((theme) => ({
  background: {
    background: ` linear-gradient(
      rgba(255, 255, 255, 0.7), 
      rgba(255, 255, 255, 0.7)
    ),url("https://naturego.s3.amazonaws.com/bucketFolder/1626098611678.png")`,
    backgroundSize: 'cover',
    // height: '100vh',
    // color: '#f5f5f5',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(3),
    width: 60,
    height: 60,
    borderRadius: '30px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#008B8B',
    color: 'white',
    fontSize: '20px',
  },
  textColor: {
    color: '#008B8B',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  specialOutline: {
    borderColor: 'rgb(0, 0, 0, 0.6) !important',
    borderWidth: 2,
  },
  media: {
    // height: 0,
    // paddingTop: '56.25%', // 16:9
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  },
}));

export default function Signup() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const classes = useStyles();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(DefaultAvatar);
  const [fileToSend, setFileToSend] = useState(DefaultAvatar);
  const [showCancel, setShowCancel] = useState(false);
  const history = useHistory();

  const handleFile = async (event) => {
    setShowCancel(true);
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileToSend(event.target.files);
  };

  const resetAvatar = () => {
    setShowCancel(false);
    setFile(DefaultAvatar);
    setFileToSend(DefaultAvatar);
  };

  const submitFile = async () => {
    try {
      if (!fileToSend) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('file', fileToSend[0]);
      const res = await axios.post(serverURL + `/aws/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('success');
      return res.data.Location;
    } catch (error) {
      console.log(error);
      console.log('upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let avatarUrl;
    file == DefaultAvatar
      ? (avatarUrl =
          'https://naturego.s3.amazonaws.com/bucketFolder/1625515883520.png')
      : (avatarUrl = await submitFile());

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Passwords do not match`);
    }

    const newUser = {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      avatarUrl: avatarUrl,
    };

    try {
      await axios.post(serverURL + '/users/register', newUser);
      setError(``);
      setLoading(true);
      console.log('signup form submitted');
      history.push('/confirmregister');
    } catch (err) {
      console.log(err);
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (
        userNameRef.current.value.length > 0 &&
        userNameRef.current.value.length <= 3
      ) {
        setError('Username must be longer than 3 letters');
      } else if (!re.test(emailRef.current.value)) {
        setError('Email must be valid');
      } else if (passwordRef.current.value.length <= 5) {
        setError('Password must be longer than 5 letters');
      } else {
        setError('Email is already used');
      }
    }
    setLoading(false);
  };

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Box display="flex">
            <Box mr={3}>
              <img alt="logo" className={classes.avatar} src={Logo} />
            </Box>
            <Box mt={3} mr={2}>
              <Typography
                fontWeight="fontWeightBold"
                component="h1"
                variant="h2"
                color="secondary"
              >
                Signup
              </Typography>
            </Box>
            <Box>
              <Room className={classes.avatar} color="secondary" />
            </Box>
          </Box>

          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  mb={2}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Box>
                    <img className={classes.media} src={file} />
                  </Box>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) => handleFile(e)}
                  />
                  <label htmlFor="raised-button-file">
                    {!showCancel && (
                      <Button
                        variant="contained"
                        color="secondary"
                        component="span"
                        startIcon={<PhotoCamera />}
                      >
                        Upload
                      </Button>
                    )}
                  </label>
                  {showCancel && (
                    <Box m={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={resetAvatar}
                      >
                        Cancel
                      </Button>
                    </Box>
                  )}
                  {!showCancel && (
                    <Box>
                      <Typography>Upload your Profile Pic</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              {error && (
                <Box
                  ml={10}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Alert severity="error">{error}</Alert>
                </Box>
              )}
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  autoComplete="uname"
                  name="userName"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoFocus
                  inputRef={userNameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  inputRef={passwordRef}
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{
                    classes: { notchedOutline: classes.specialOutline },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password-confirm"
                  label="Password Confirmation"
                  type="password"
                  inputRef={passwordConfirmRef}
                  id="passwordConfirm"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item xs={12}>
                <Link
                  to="/login"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography className={classes.textColor} variant="h6">
                    {' '}
                    Already have an account? Log in
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
