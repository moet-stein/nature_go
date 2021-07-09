import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MyPicFavPicContext } from '../context/MyPicFavPicContext';
import { FavSavContext } from '../context/FavSavContext';
import ImgsWithProp from '../components/ImgsWithProp';
import NoUploads from '../img/nouploads.gif';
import NoFavs from '../img/nofavorites.gif';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import teal from '@material-ui/core/colors/teal';
import { Link } from 'react-router-dom';
const serverURL = require('../config').serverURL;

export default function MyPageImages({ showFavPics }) {
  const { userInfo } = useContext(AuthContext);
  const {
    setSavIdArr,
    matchedFavIdArr,
    setMatchedFavIdArr,
    setMatchedSaveIdArr,
    setMatchedMyPicIdArr,
  } = useContext(FavSavContext);
  const { myPicsArr, setMyPicsArr, favPicsArr, setFavPicsArr } = useContext(
    MyPicFavPicContext
  );

  const getUserInfo = async () => {
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(serverURL + '/users/profile', config);

      return res.data;
    }
  };

  useEffect(async () => {
    const userData = await getUserInfo();
    const userId = userInfo._id || userData._id;
    const res = await axios.get(serverURL + `/users/myfavpics/${userId}`);
    setMyPicsArr(res.data.myPics);
    setFavPicsArr(res.data.favoritePics);

    setMatchedSaveIdArr(
      res.data.favoritePics
        .map((pic) => pic.url)
        .filter((url) =>
          userData.savedPics.map((pic) => pic.originalImage).includes(url)
        )
    );
    setMatchedMyPicIdArr(res.data.myPics.map((pic) => pic.url));
  }, []);

  return (
    <div>
      {!showFavPics && (
        <Box mt={3}>
          <Typography variant="h5" style={{ color: teal[900] }}>
            My Nature Pics
          </Typography>
          <ImgsWithProp picsArr={myPicsArr} />
        </Box>
      )}
      {!showFavPics && myPicsArr.length == 0 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography color="secondary" variant="h4">
            No Uploads Yet
          </Typography>
          <img alt="nomypics" src={NoUploads} width="250" />
          <Link style={{ textDecoration: 'none' }} to="/naturespots">
            <Button variant="contained" color="secondary">
              Find
            </Button>
          </Link>
          <Box mt={1}>
            <Typography variant="body2" color="secondary">
              Find or Create Naturespot <br /> to upload your own pictures
            </Typography>
          </Box>
        </Box>
      )}

      {showFavPics && (
        <Box mt={3}>
          <Typography variant="h5" style={{ color: teal[900] }}>
            Favorites
          </Typography>
          <ImgsWithProp picsArr={favPicsArr} />
        </Box>
      )}

      {showFavPics && favPicsArr.length == 0 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography color="secondary" variant="h4">
            No Favorites Yet
          </Typography>
          <img alt="nofavorites" src={NoFavs} width="250" />
          <Link style={{ textDecoration: 'none' }} to="/naturespots">
            <Button variant="contained" color="secondary">
              Find
            </Button>
          </Link>
          <Box mt={1}>
            <Typography variant="body2" color="secondary">
              Find Naturespot <br /> to like others' pictures
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
}
