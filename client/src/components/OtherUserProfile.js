import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function OtherUserProfile({ otherUser }) {
  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <Box m={3} display="flex" justifyContent="center" alignItems="center">
        <Box mr={2}>
          <Avatar alt={otherUser.username} src={otherUser.avatarUrl} />
        </Box>
        <Typography>{otherUser.username}</Typography>
      </Box>
      <Box>
        <Typography>Uploads: {otherUser.myPics.length}</Typography>
        <Typography>Matching: {otherUser.savedPics.length} Pics</Typography>
      </Box>
    </Box>
  );
}
