import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import lime from '@material-ui/core/colors/lime';
import lightBlue from '@material-ui/core/colors/lightBlue';
import teal from '@material-ui/core/colors/teal';
import { AuthContext } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  lime: { backgroundColor: lime[200], color: teal[800] },
  lightBlue: { color: teal[700] },
}));

export default function ProfileSection() {
  const { userInfo } = useContext(AuthContext);
  const location = useLocation();
  const classes = useStyles();

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box mr={2}>
          <Avatar alt={userInfo.username} src={userInfo.avatarUrl} />
          <Typography className={classes.lightBlue} variant="h5">
            {userInfo.username}
          </Typography>
        </Box>
        {location.pathname.includes('/mypage') && (
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
        )}
      </Box>
    </div>
  );
}
