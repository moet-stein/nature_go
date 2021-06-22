import React from 'react';
import Masonry from 'react-masonry-css';
import moduleClasses from './styles/Images.module.css';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import ImageList from '@material-ui/core/ImageList';
// import ImageListItem from '@material-ui/core/ImageListItem';

const useStyle = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  picWidth: {
    // margin: '5px',
  },
  card: {
    width: '160px',
    transition: 'all .25s linear',
    boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.4)',
    '&:hover , &:active': { boxShadow: ' -1px 10px 29px 0px rgba(0,0,0,0.8)' },
  },
}));

export default function Images({ picsArr }) {
  const classes = useStyle();

  const breakpoints = {
    default: 3,
    1100: 2,
    // 700: 1,
  };
  return (
    <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
      <Masonry
        breakpointCols={+breakpoints}
        className={moduleClasses.myMasonryGrid}
        columnClassName={moduleClasses.myMasonryGridColumn}
      >
        {picsArr.map((pic) => {
          return (
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={pic}
                title="Paella dish"
              />
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
}
