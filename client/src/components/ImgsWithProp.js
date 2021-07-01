import React, { useEffect, useContext } from 'react';
import { FavSavContext } from '../context/FavSavContext';
import { MyPicFavPicContext } from '../context/MyPicFavPicContext';
import { PicsArrContext } from '../context/PicsArrContext';
import UserHeader from './UserHeader';
import FavSav from './FavSav';
import Masonry from 'react-masonry-css';
import moduleClasses from './styles/Images.module.css';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
      setPicsIdArr(picsArr.map((pic) => pic._id));
      setMatchedFavIdArr(favPicsArr.map((pic) => pic._id));
      console.log('I am favpicsarr');
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
              <CardMedia className={classes.media} image={pic.url} />
              <FavSav pic={pic} />
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
}
