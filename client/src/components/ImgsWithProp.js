import React, { useEffect, useContext } from 'react';
import { FavSavContext } from '../context/FavSavContext';
import { MyPicFavPicContext } from '../context/MyPicFavPicContext';
import { PicsArrContext } from '../context/PicsArrContext';
import UserHeader from './UserHeader';
import PicModal from './PicModal';
import FavSav from './FavSav';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

const useStyle = makeStyles(() => ({
  root: {
    width: '300px',
    '&:hover': { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8)' },
  },
  '@media only screen and (max-width: 600px)': {
    root: {
      width: '160px',
    },
  },
}));

export default function ImgsWithProp({ picsArr }) {
  const classes = useStyle();
  const { setMatchedFavIdArr } = useContext(FavSavContext);
  const { setPicsIdArr } = useContext(PicsArrContext);
  const { favPicsArr } = useContext(MyPicFavPicContext);

  useEffect(() => {
    if (picsArr == favPicsArr) {
      setPicsIdArr(picsArr.map((pic) => pic.url));
      setMatchedFavIdArr(favPicsArr.map((pic) => pic.url));
    }
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
    >
      {picsArr.map((pic) => {
        return (
          <Box m={1}>
            <Card key={pic._id} className={classes.root}>
              {'author' in pic && <UserHeader pic={pic} />}
              <PicModal pic={pic} />
              <FavSav pic={pic} />
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}
