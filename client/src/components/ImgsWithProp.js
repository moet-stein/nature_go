import React, { useEffect, useContext } from 'react';
import { FavSavContext } from '../context/FavSavContext';
import { MyPicFavPicContext } from '../context/MyPicFavPicContext';
import { PicsArrContext } from '../context/PicsArrContext';
import UserHeader from './UserHeader';
import PicModal from './PicModal';
import FavSav from './FavSav';
import Masonry from 'react-masonry-css';
import moduleClasses from './styles/Images.module.css';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

const useStyle = makeStyles(() => ({
  root: {
    maxWidth: 345,
    '&:hover': { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8)' },
  },
}));

export default function ImgsWithProp({ picsArr }) {
  const classes = useStyle();
  const { setMatchedFavIdArr } = useContext(FavSavContext);
  const { setPicsIdArr } = useContext(PicsArrContext);
  const { favPicsArr } = useContext(MyPicFavPicContext);

  const breakpoints = {
    default: 3,
    1100: 4,
    700: 2,
  };
  useEffect(() => {
    if (picsArr == favPicsArr) {
      setPicsIdArr(picsArr.map((pic) => pic.url));
      setMatchedFavIdArr(favPicsArr.map((pic) => pic.url));
    }
  }, []);

  return (
    <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }} m={2}>
      <Masonry
        breakpointCols={breakpoints}
        className={moduleClasses.myMasonryGrid}
        columnClassName={moduleClasses.myMasonryGridColumn}
      >
        {picsArr.map((pic) => {
          return (
            <Card key={pic._id} className={classes.root}>
              {'author' in pic && <UserHeader pic={pic} />}
              <PicModal pic={pic} />
              <FavSav pic={pic} />
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
}
