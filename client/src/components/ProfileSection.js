import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function ProfileSection() {
  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box mr={2}>
          <Avatar
            alt="Yoda"
            src="https://images.unsplash.com/photo-1587813368357-9e58f27691b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          />
        </Box>
        <Typography>Username</Typography>
      </Box>
    </div>
  );
}
