import React, { useState, useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../context/AuthContext';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function UserHeader({ pic }) {
  const classes = useStyle();
  const { userInfo } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(false);

  // const link = () => {
  //   console.log(pic.author._id, userInfo._id);
  //   console.log(pic.author._id === userInfo._id);
  //   if (pic.author._id === userInfo._id) {
  //     setLinkTo(`/mypage/${userInfo._id}`);
  //   } else {
  //     setLinkTo(`/otheruser/${pic.author._id}`);
  //   }
  // };
  const headerContents = (pic) => {
    return (
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        ml={2}
      >
        <Box mr={1} mt={1} mb={1}>
          <Avatar
            alt={pic.author.username}
            src={pic.author.avatarUrl}
            className={classes.small}
          />
        </Box>
        <Box mt={1} mb={1}>
          <Typography color="secondary">{pic.author.username}</Typography>
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    if (pic.author._id === userInfo._id) setCurrentUser(true);
  }, []);

  return (
    <Paper>
      {!currentUser ? (
        <Link
          style={{ textDecoration: 'none' }}
          to={`/otheruser/${pic.author._id}`}
        >
          {headerContents(pic)}
        </Link>
      ) : (
        <Link style={{ textDecoration: 'none' }} to={`/mypage/${userInfo._id}`}>
          {headerContents(pic)}
        </Link>
      )}
    </Paper>
  );
}
