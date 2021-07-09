import React, { useEffect, useState, useContext } from 'react';
import NoMatchings from '../img/nomatchings.gif';
import OtherUserProfile from '../components/OtherUserProfile';
import AppBarComponent from '../components/AppBarComponent';
import GoBack from '../components/GoBack';
import OtherUserImg from '../components/OtherUserImg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { OtherUserContext } from '../context/OtherUserContext';
import { AuthContext } from '../context/AuthContext';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const serverURL = require('../config').serverURL;

export default function OtherUser() {
  const { otherUserId } = useParams();
  const [otherUser, setOtherUser] = useState(null);
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const [userId, setUserId] = useState(userInfo._id || null);
  const {
    havMatPicArr,
    setHavMatPicArr,
    giveMatPicArr,
    setGiveMatPicArr,
  } = useContext(OtherUserContext);

  const getUserInfo = async () => {
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(serverURL + '/users/profile', config);
      setUserInfo(res.data);
      await setUserId(res.data._id);
    }
  };

  const getOtherUserInfo = async () => {
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(
        serverURL + `/users/otheruser/${otherUserId}`,
        config
      );

      setOtherUser(res.data);
      setHavMatPicArr(
        res.data.savedPics.filter((p) => p.matchedImage.length > 0)
      );
      setGiveMatPicArr(
        res.data.savedPics
          .filter((p) => p.matching.includes(userId))
          .map((obj) => obj._id)
      );
      // console.log(
      //   res.data.savedPics.filter((p) => p.matching.includes(userId))
      // );
      // console.log(
      //   res.data.savedPics
      //     .filter((p) => p.matching.includes(userId))
      //     .map((obj) => obj._id)
      // );
    }
  };

  useEffect(async () => {
    await getUserInfo();
    await getOtherUserInfo();
  }, []);

  return (
    <div>
      <AppBarComponent />
      <GoBack />
      {otherUser && <OtherUserProfile otherUser={otherUser} />}
      {havMatPicArr &&
        havMatPicArr.map((pic, index) => (
          <OtherUserImg pic={pic} index={index} />
        ))}
      {havMatPicArr && havMatPicArr.length === 0 && (
        <Box>
          <Typography variant="h4" color="secondary">
            The user did not upload any matching pics yet
          </Typography>
          <Box mt={3}>
            <img alt="nomatchings" src={NoMatchings} width="250px" />
          </Box>
        </Box>
      )}
    </div>
  );
}
