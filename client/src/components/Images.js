import React, { useContext, useEffect } from 'react';
import UserHeader from './UserHeader';
import FavSav from './FavSav';
import Masonry from 'react-masonry-css';
import moduleClasses from './styles/Images.module.css';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { PicsArrContext } from '../context/PicsArrContext';
import { AuthContext } from '../context/AuthContext';

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function Images() {
  const classes = useStyle();
  const { picturesArr } = useContext(PicsArrContext);
  const { userInfo } = useContext(AuthContext);

  const breakpoints = {
    default: 3,
    1100: 4,
    700: 2,
  };

  return (
    <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }} m={2}>
      <Masonry
        breakpointCols={breakpoints}
        className={moduleClasses.myMasonryGrid}
        columnClassName={moduleClasses.myMasonryGridColumn}
      >
        {picturesArr.map((pic) => {
          return (
            <Card key={pic._id} className={classes.root}>
              <UserHeader pic={pic} />
              <CardMedia className={classes.media} image={pic.url} />
              {userInfo.length > 0 && <FavSav pic={pic} />}
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
}
