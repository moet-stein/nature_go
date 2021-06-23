import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from '../context/AuthContext';

export default function ProfileSection() {
  const { userInfo } = useContext(AuthContext);
  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box mr={2}>
          <Avatar alt={userInfo.username} src={userInfo.avatarUrl} />
        </Box>
        <Typography>{userInfo.username}</Typography>
      </Box>
    </div>
  );
}
