import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { MyPicFavPicContext } from '../context/MyPicFavPicContext';
import { FavSavContext } from '../context/FavSavContext';
import ImgsWithProp from '../components/ImgsWithProp';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
      const res = await axios.get('/users/profile', config);

      return res.data;
    }
  };

  useEffect(async () => {
    const userData = await getUserInfo();
    const userId = userInfo._id || userData._id;
    const res = await axios.get(`/users/myfavpics/${userId}`);
    setMyPicsArr(res.data.myPics);
    setFavPicsArr(res.data.favoritePics);

    setMatchedSaveIdArr(
      res.data.favoritePics
        .map((pic) => pic._id)
        .filter((id) =>
          userData.savedPics.map((pic) => pic.savedImage).includes(id)
        )
    );
    setMatchedMyPicIdArr(res.data.myPics.map((pic) => pic._id));
  }, []);

  return (
    <div>
      {!showFavPics && (
        <Box mt={3}>
          <Typography variant="h5">My Nature Pics</Typography>
          <ImgsWithProp picsArr={myPicsArr} />
        </Box>
      )}
      {showFavPics && (
        <Box mt={3}>
          <Typography variant="h5">Favorites</Typography>
          <ImgsWithProp picsArr={favPicsArr} />
        </Box>
      )}
    </div>
  );
}
