import React, { useEffect } from 'react';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function MyPageImages({ showFavPics }) {
  useEffect(() => {
    // const res = await axios.get(`/users/profile`);
  }, []);

  return (
    <div>
      {!showFavPics && (
        <Box mt={3}>
          <Typography variant="h5">My Nature Pics</Typography>
          {/* <Images picsArr={myPicsArr} /> */}
        </Box>
      )}
      {showFavPics && (
        <Box mt={3}>
          <Typography variant="h5">Favorites</Typography>
          {/* <Images picsArr={favPicsArr} /> */}
        </Box>
      )}
    </div>
  );
}
