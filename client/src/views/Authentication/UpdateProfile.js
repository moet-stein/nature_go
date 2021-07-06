import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import GoBack from '../../components/GoBack';
import Typography from '@material-ui/core/Typography';
import Image from '../../img/landing_pic.png';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

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
    width: '350px',
    margin: theme.spacing(2),
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

export default function UpdateProfile() {
  const classes = useStyles();
  const { userInfo } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const emailRef = useRef();
  const userNameRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [fileToSend, setFileToSend] = useState(null);
  const [showCancel, setShowCancel] = useState(false);
  const history = useHistory();

  const getUserInfo = async () => {
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get('/users/profile', config);
      setUser(res.data);
      setFile(res.data.avatarUrl);
      setFileToSend(res.data.avatarUrl);
    }
  };

  useEffect(async () => {
    await getUserInfo();

    setLoading(false);
    console.log(user);
  }, []);

  const handleFile = async (event) => {
    setShowCancel(true);
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileToSend(event.target.files);
    console.log(event.target.files);
  };

  const resetAvatar = () => {
    setShowCancel(false);
    setFile(user.avatarUrl);
    setFileToSend(user.avatarUrl);
  };

  const submitFile = async () => {
    try {
      if (!fileToSend) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('file', fileToSend[0]);
      const res = await axios.post(`/aws/upload`, formData, {
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
    file == user.avatarUrl
      ? (avatarUrl = user.avatarUrl)
      : (avatarUrl = await submitFile());

    console.log(userNameRef.current.value, emailRef.current.value.length);
    const username =
      userNameRef.current.value.length == 0
        ? user.username
        : userNameRef.current.value;

    const email =
      emailRef.current.value.length == 0 ? user.email : emailRef.current.value;

    const updatedUser = {
      userId: user._id,
      username: username,
      email: email,
      avatarUrl: avatarUrl,
      oldEmail: user.email,
    };

    console.log(updatedUser);
    try {
      await axios.post('/users/updateprofile', updatedUser);
      setError(``);
      setLoading(true);
      console.log('profile updated');
      history.push(`/mypage/${user._id}`);
    } catch (err) {
      console.log(err);
      setError(`${err}, Failed to update profile`);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <GoBack />
      <Typography>Update Profile</Typography>
      {!loading && (
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
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Change
                  </Button>
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
              </Box>
            </Grid>
            <Box m={2}>
              <Typography color="secondary">
                Leave Blank if no changes
              </Typography>
            </Box>
            <Grid item xs={12}>
              <Box ml={2} display="flex" justifyContent="flex-start">
                <Typography color="primary">{user.username}</Typography>
              </Box>
              <TextField
                InputProps={{
                  classes: { notchedOutline: classes.specialOutline },
                }}
                autoComplete="uname"
                name="userName"
                variant="outlined"
                fullWidth
                id="userName"
                label="Username"
                autoFocus
                inputRef={userNameRef}
              />
            </Grid>
            <Grid item xs={12}>
              <Box ml={2} display="flex" justifyContent="flex-start">
                <Typography color="primary">{user.email}</Typography>
              </Box>
              <TextField
                InputProps={{
                  classes: { notchedOutline: classes.specialOutline },
                }}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
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
            Update
          </Button>
        </form>
      )}
    </React.Fragment>
  );
}
