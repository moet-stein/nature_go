import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import cyan from '@material-ui/core/colors/cyan';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function SavLink({ pic, spot }) {
  useEffect(() => {
    console.log(spot);
  }, []);
  return (
    <Link
      to={{
        pathname: `/details/${pic.natureSpotId}`,
        state: {
          spot,
        },
      }}
      style={{ textDecoration: 'none' }}
    >
      <Box mt={1} mb={1} display="flex">
        <Typography color="secondary">{spot.title}</Typography>
        <ArrowForwardIcon style={{ color: cyan[500] }} />
      </Box>
    </Link>
  );
}
