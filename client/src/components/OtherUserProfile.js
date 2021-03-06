import React, { useEffect, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { OtherUserContext } from '../context/OtherUserContext';

export default function OtherUserProfile({ otherUser }) {
  const { havMatPicArr } = useContext(OtherUserContext);

  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <Box m={3} display="flex" justifyContent="center" alignItems="center">
        <Box mr={2}>
          <Avatar alt={otherUser.username} src={otherUser.avatarUrl} />
        </Box>
        <Typography color="secondary">{otherUser.username}</Typography>
      </Box>
      <Box>
        <Typography color="primary">
          Matching: {havMatPicArr.length} Pics
        </Typography>
      </Box>
    </Box>
  );
}
