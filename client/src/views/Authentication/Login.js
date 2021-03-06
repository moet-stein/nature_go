import React, { useRef, useState } from 'react';
import axios from 'axios';
import Image from '../../img/landing_pic.png';
import Logo from '../../img/avatar1.png';
import Room from '@material-ui/icons/Room';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import teal from '@material-ui/core/colors/teal';
import { Link, useHistory } from 'react-router-dom';
const serverURL = require('../../config').serverURL;

const useStyles = makeStyles((theme) => ({
  background: {
    background: ` linear-gradient(
      rgba(255, 255, 255, 0.7), 
      rgba(255, 255, 255, 0.7)
    ),url("https://naturego.s3.amazonaws.com/bucketFolder/1626098611678.png")`,
    backgroundSize: 'cover',
    height: '100vh',
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
    color: teal[900],
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
  const passwordRef = useRef();
  const classes = useStyles();
  //   const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post(serverURL + '/users/login', user);
      window.localStorage.setItem('token', res.data.token);
      if (res.data.token == undefined) {
        return setError(`Password is wrong`);
      }
      setError(``);
      setLoading(true);
      history.push('/naturespots');
      console.log('login submitted');
    } catch (e) {
      console.log(e);
      setError(`Email address or password is wrong`);
    }
    setLoading(false);
  };
  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box className={classes.boxSize}>
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
                  Login
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                disabled={loading}
              >
                Login
              </Button>
              <Grid container justify="flex-end">
                <Grid item xs={12}>
                  <Link
                    to="/signup"
                    variant="body2"
                    style={{ textDecoration: 'none' }}
                  >
                    <Box m={2}>
                      <Typography className={classes.textColor} variant="h6">
                        No account yet? Signup
                      </Typography>
                    </Box>
                  </Link>
                  <Link
                    to="/forgotpass"
                    variant="body2"
                    style={{ textDecoration: 'none' }}
                  >
                    {' '}
                    <Box m={2}>
                      <Typography className={classes.textColor} variant="h6">
                        Forgot Password?
                      </Typography>
                    </Box>
                  </Link>
                </Grid>

                <Grid item>
                  <Box>
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
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    </div>
  );
}
