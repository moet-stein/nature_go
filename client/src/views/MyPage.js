import React from 'react';
import AppBarComponent from '../components/AppBarComponent';
import Typography from '@material-ui/core/Typography';

export default function MyPage() {
  return (
    <div>
      <AppBarComponent />
      <Typography variant="h1">My Page</Typography>
      <Typography>
        Planning to put my updloaded pictures and liked pictures
      </Typography>
    </div>
  );
}
