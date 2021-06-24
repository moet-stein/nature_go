import React, { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Logo from '../../img/avatar1.png';
import Room from '@material-ui/icons/Room';
import Avatars from './Avatars';
import Image from '../../img/landing_pic.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import { useAuth } from '../context/AuthContext';
import Alert from '@material-ui/lab/Alert';
import teal from '@material-ui/core/colors/teal';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  background: {
    background: ` linear-gradient(
      rgba(255, 255, 255, 0.7), 
      rgba(255, 255, 255, 0.7)
    ),url(${Image})`,
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
}));

export default function Signup() {
  const emailRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const classes = useStyles();
  //   const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userNameRef.current.value, emailRef.current.value);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Passwords do not match`);
    }

    const newUser = {
      username: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post('/users/register', newUser);
      setError(``);
      setLoading(true);
      console.log('signup form submitted');
      history.push('/naturespots');
    } catch (err) {
      console.log(err);
      setError(`${err}, Failed to create an account`);
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
              <img className={classes.avatar} src={Logo} />
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
          {error && <Alert severity="error">{error}</Alert>}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <Typography>Choose your avatar</Typography>
                </Box>
                <Avatars />
              </Grid>
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
