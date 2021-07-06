import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import lime from '@material-ui/core/colors/lime';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  lime: { backgroundColor: lime[200], color: 'secondary' },
}));

export default function ProfileSection() {
  const { userInfo } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box mr={2}>
          <Avatar alt={userInfo.username} src={userInfo.avatarUrl} />
          <Typography>{userInfo.username}</Typography>
        </Box>
        <Box ml={3}>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/updateprofile/${userInfo._id}`}
          >
            <Button className={classes.lime} variant="contained">
              Update Profile
            </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}
