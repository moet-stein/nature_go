import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FavSavContext } from '../context/FavSavContext';
import { PicsArrContext } from '../context/PicsArrContext';
import { MyPicFavPicContext } from '../context/MyPicFavPicContext';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';

const useStyle = makeStyles(() => ({
  action: {
    padding: '0px !important',
  },
}));

export default function FavSav({ pic }) {
  const classes = useStyle();
  const location = useLocation();
  const { userInfo } = useContext(AuthContext);
  const {
    matchedFavIdArr,
    setMatchedFavIdArr,
    matchedSaveIdArr,
    setMatchedSaveIdArr,
    matchedMyPicIdArr,
    setMatchedMyPicIdArr,
  } = useContext(FavSavContext);
  const { picturesArr } = useContext(PicsArrContext);
  const { myPicsArr, setMyPicsArr, favPicsArr, setFavPicsArr } = useContext(
    MyPicFavPicContext
  );

  // Show favorite or save icon
  // icon1: If the pic is the user's own pic, he/she cannot like the pic
  // icon2: If the pic is already liked or saved by the user, show the colored icon (it's able to be unliked or unsaved)
  // icon3: If the pic is not the user's one and if the user did not like or save it yet, just show the icon that is able to be clicked to like or save
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

    if (matchedMyPicIdArr && matchedMyPicIdArr.includes(pic.url)) {
      return (
        <IconButton aria-label={`add to ${kind}`} disabled>
          {kindObj.icon1}
          <Typography>{kindObj.showNum}</Typography>
        </IconButton>
      );
    } else if (kindObj.matchedArr && kindObj.matchedArr.includes(pic.url)) {
      return (
        <IconButton
          aria-label={`add to ${kind}`}
          onClick={() => handleFavSav(pic.url, kind)}
        >
          {kindObj.icon2}
          <Typography>{kindObj.showNum}</Typography>
        </IconButton>
      );
    } else {
      return (
        <IconButton
          aria-label={`add to ${kind}`}
          onClick={() => handleFavSav(pic.url, kind)}
        >
          {kindObj.icon3}
          <Typography>{kindObj.showNum}</Typography>
        </IconButton>
      );
    }
  };

  const handleFavSav = (picUrl, kind) => {
    console.log(pic);
    let removeRoute, addRoute, arr, setArr, picObjArr;
    // When detailed page => picturesArr
    // WHen mypage (on favorite (myPics cannot be liked or saved))  => favPicsArr
    picObjArr = picturesArr.length > 0 ? picturesArr : favPicsArr;
    console.log(picObjArr);

    //   Depending on favorite icon or save icon, routes and arr to be manipulated are different
    if (kind === 'favorite') {
      removeRoute = 'removefavorite';
      addRoute = 'addfavorite';
      arr = matchedFavIdArr;
      setArr = setMatchedFavIdArr;
    } else {
      removeRoute = 'removesaved';
      addRoute = 'addsaved';
      arr = matchedSaveIdArr;
      setArr = setMatchedSaveIdArr;
    }

    // Function to call post route to either add or remove favorite/save
    const addremove = async (route) => {
      let body;
      if (route == 'addsaved') {
        body = {
          natureSpotId: pic.naturespot,
          userId: userInfo._id,
          origUrl: pic.url,
        };
      } else if (route == 'removesaved') {
        body = {
          userId: userInfo._id,
          origUrl: pic.url,
        };
      } else if (route == 'removefavorite') {
        body = {
          imageUrl: pic.url,
          imageId: pic._id,
          userId: userInfo._id,
        };
      } else {
        body = {
          imageId: pic._id,
          userId: userInfo._id,
        };
      }

      const postReq = await axios.post(`/images/${route}`, body);
    };

    // arr.includes(picUrl), that means arr includes the id: already liked or saved => make it remove on clicke
    if (arr.includes(picUrl)) {
      // post route to remove
      addremove(removeRoute);

      //   get rid of the id from idArr, so that the icon color changes to grey
      setArr(arr.filter((id) => id !== picUrl));

      //   find index to decrease the number of the pic obj to show total likes/saved
      let picObjIndex = picObjArr.findIndex((obj) => obj.url == picUrl);

      //  if arr is matchedFavIdArr, decrease likes
      if (arr === matchedFavIdArr) {
        picObjArr[picObjIndex].likes -= 1;
        //   When on mypage, get rid of the pic as it is unliked, no favorite pic anymore
        if (location.pathname.includes('/mypage')) {
          setFavPicsArr(favPicsArr.filter((pic) => pic.url !== picUrl));
        }
      } else {
        picObjArr[picObjIndex].saved -= 1;
      }
      // arr.includes(picUrl) == false, that means the user cliked the icon to add favorite or save
    } else {
      //   add favorite or save in database (route)
      addremove(addRoute);
      //   add to fav/save to show the colored icon
      setArr((oldArray) => [...oldArray, picUrl]);

      let picObjIndex = picObjArr.findIndex((obj) => obj.url == picUrl);
      console.log(picObjArr, picObjIndex);

      if (arr === matchedFavIdArr) {
        picObjArr[picObjIndex].likes += 1;
      } else {
        picObjArr[picObjIndex].saved += 1;
      }
    }
  };

  const handleDelete = async () => {
    console.log('delete clicked');
    setMyPicsArr(myPicsArr.filter((p) => p.url !== pic.url));
    const body = {
      imageId: pic._id,
      userId: userInfo._id,
      natureSpotId: pic.natureSpotId,
    };
    const res = await axios.post('/images/deletemypic', body);
    console.log(res);
  };

  return (
    <CardActions disableSpacing className={classes.action}>
      {showIcon(pic, 'favorite')}
      {showIcon(pic, 'save')}
      {matchedMyPicIdArr && matchedMyPicIdArr.includes(pic.url) && (
        <Box ml={3}>
          <DeleteOutlineIcon
            onClick={handleDelete}
            style={{ color: teal[200] }}
          />
        </Box>
      )}
    </CardActions>
  );
}
