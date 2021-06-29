import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-masonry-css';
import moduleClasses from './styles/Images.module.css';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { AuthContext } from '../context/AuthContext';
import { FavSavContext } from '../context/FavSavContext';

// import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyle = makeStyles((theme) => ({
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
  action: {
    padding: '0px !important',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function Images({ picsArr }) {
  const classes = useStyle();
  const { userInfo } = useContext(AuthContext);
  const {
    matchedFavIdArr,
    setMatchedFavIdArr,
    matchedSaveIdArr,
    setMatchedSaveIdArr,
  } = useContext(FavSavContext);
  const [picsIdArr, setPicsIdArr] = useState([]);
  const [favIdArr, setFavIdArr] = useState([]);
  const [savIdArr, setSavIdArr] = useState([]);

  const breakpoints = {
    default: 3,
    1100: 4,
    700: 2,
  };

  const handleFav = async (picId) => {
    if (matchedFavIdArr.includes(picId)) {
      console.log('remove fav');
      const favPic = {
        imageId: picId,
        userId: userInfo._id,
      };
      const res = await axios.post('/images/removefavorite', favPic);
    } else {
      console.log('add fav');
    }
  };

  useEffect(async () => {
    await setPicsIdArr(picsArr.map((p) => p._id));
    await setFavIdArr(userInfo.favoritePics);
    await setSavIdArr(userInfo.savedPics);
    await setMatchedFavIdArr(picsIdArr.filter((id) => favIdArr.includes(id)));
    await setMatchedSaveIdArr(picsIdArr.filter((id) => savIdArr.includes(id)));
    console.log(picsArr);
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
              <Paper>
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  ml={2}
                >
                  <Box mr={1} mt={1} mb={1}>
                    <Avatar
                      alt={pic.author.username}
                      src={pic.author.avatarUrl}
                      className={classes.small}
                    />
                  </Box>
                  <Box mt={1} mb={1}>
                    <Typography color="secondary">
                      {pic.author.username}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              <CardMedia className={classes.media} image={pic.url} />
              <CardActions disableSpacing className={classes.action}>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleFav(pic._id)}
                >
                  {matchedFavIdArr.includes(pic._id) ? (
                    <FavoriteIcon style={{ color: red[500] }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}

                  <Typography>{pic.likes}</Typography>
                </IconButton>
                <IconButton aria-label="add to save">
                  <BookmarkBorderIcon />
                  <Typography>{pic.saved}</Typography>
                </IconButton>
                <IconButton aria-label="comments">
                  <ChatBubbleOutlineIcon />
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
