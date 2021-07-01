import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FavSavContext } from '../context/FavSavContext';
import { PicsArrContext } from '../context/PicsArrContext';
import { makeStyles } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles(() => ({
  action: {
    padding: '0px !important',
  },
}));

export default function FavSav({ pic }) {
  const classes = useStyle();
  const { userInfo } = useContext(AuthContext);
  const {
    matchedFavIdArr,
    setMatchedFavIdArr,
    matchedSaveIdArr,
    setMatchedSaveIdArr,
    matchedMyPicIdArr,
  } = useContext(FavSavContext);
  const { picturesArr } = useContext(PicsArrContext);

  const showIcon = (pic, kind) => {
    const kindObj =
      kind == 'favorite'
        ? {
            icon1: <FavoriteIcon />,
            icon2: <FavoriteIcon style={{ color: red[500] }} />,
            icon3: <FavoriteBorderIcon />,
            showNum: pic.likes,
            matchedArr: matchedFavIdArr,
            setMatchedIdArr: setMatchedFavIdArr,
          }
        : {
            icon1: <BookmarkIcon />,
            icon2: <BookmarkIcon style={{ color: teal[500] }} />,
            icon3: <BookmarkBorderIcon />,
            showNum: pic.saved,
            matchedArr: matchedSaveIdArr,
            setMatchedIdArr: setMatchedSaveIdArr,
          };

    if (matchedMyPicIdArr && matchedMyPicIdArr.includes(pic._id)) {
      return (
        <IconButton aria-label={`add to ${kind}`} disabled>
          {kindObj.icon1}
          <Typography>{kindObj.showNum}</Typography>
        </IconButton>
      );
    } else if (kindObj.matchedArr && kindObj.matchedArr.includes(pic._id)) {
      return (
        <IconButton
          aria-label={`add to ${kind}`}
          onClick={() => handleFavSav(pic._id, kind)}
        >
          {kindObj.icon2}
          <Typography>{kindObj.showNum}</Typography>
        </IconButton>
      );
    } else {
      return (
        <IconButton
          aria-label={`add to ${kind}`}
          onClick={() => handleFavSav(pic._id, kind)}
        >
          {kindObj.icon3}
          <Typography>{kindObj.showNum}</Typography>
        </IconButton>
      );
    }
  };

  const handleFavSav = (picId, kind) => {
    let removeRoute, addRoute, arr, setArr;
    if (kind === 'favorite') {
      console.log('this is favorite');
      removeRoute = 'removefavorite';
      addRoute = 'addfavorite';
      arr = matchedFavIdArr;
      setArr = setMatchedFavIdArr;
    } else {
      console.log('this is save');
      removeRoute = 'removesaved';
      addRoute = 'addsaved';
      arr = matchedSaveIdArr;
      setArr = setMatchedSaveIdArr;
    }

    const addremove = async (route) => {
      const body = {
        imageId: picId,
        userId: userInfo._id,
      };
      const postReq = await axios.post(`/images/${route}`, body);
    };

    if (arr.includes(picId)) {
      addremove(removeRoute);
      setArr(arr.filter((id) => id !== picId));
      let picObjIndex = picturesArr.findIndex((obj) => obj._id == picId);
      if (arr === matchedFavIdArr) {
        picturesArr[picObjIndex].likes -= 1;
      } else {
        picturesArr[picObjIndex].saved -= 1;
      }
      console.log('remove fav', arr);
    } else {
      addremove(addRoute);
      console.log(addRoute);
      setArr((oldArray) => [...oldArray, picId]);
      let picObjIndex = picturesArr.findIndex((obj) => obj._id == picId);
      if (arr === matchedFavIdArr) {
        picturesArr[picObjIndex].likes += 1;
      } else {
        picturesArr[picObjIndex].saved += 1;
      }
      console.log('add fav', arr);
    }
  };

  return (
    <CardActions disableSpacing className={classes.action}>
      {showIcon({ pic }, 'favorite')}
      {showIcon({ pic }, 'save')}
    </CardActions>
  );
}
