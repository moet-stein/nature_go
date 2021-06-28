import React from 'react';
import Masonry from 'react-masonry-css';
import moduleClasses from './styles/Images.module.css';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

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
  avatarSize: {
    width: '20px',
    height: '20px',
  },
  action: {
    padding: '0px !important',
  },
}));

export default function Images({ picsArr }) {
  const classes = useStyle();

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
        {picsArr.map((pic) => {
          return (
            <Card key={pic} className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    className={classes.avatarSize}
                    sx={{ bgcolor: 'primary' }}
                    aria-label="recipe"
                  >
                    R
                  </Avatar>
                }
                // title="Shrimp and Chorizo Paella"
                subheader="Username"
              />
              <CardMedia className={classes.media} image={pic} />
              <CardActions disableSpacing className={classes.action}>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                  <Typography>0</Typography>
                </IconButton>
                <IconButton aria-label="add to favorites">
                  <BookmarkBorderIcon />
                  <Typography>0</Typography>
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </Masonry>
    </Box>
  );
}
