import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { SavedArrContext } from '../context/SavedArrContext';
import axios from 'axios';
import AppBarComponent from '../components/AppBarComponent';
import ProfileSection from '../components/ProfileSection';
import SavedMatchImgs from '../components/SavedMatchImgs';
import Box from '@material-ui/core/Box';

export default function SavedToMatch() {
  const { userInfo } = useContext(AuthContext);
  const { savedArr, setSavedArr, spotsArr, setSpotsArr } = useContext(
    SavedArrContext
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
    const res = await axios.get(`/users/savedpics/${userId}`);
    await setSavedArr(res.data.savedPics);
    console.log(res.data.savedPics);
    res.data.savedPics.forEach(async (s) => {
      const res = await axios.get(`/naturespots/${s.natureSpotId}`);
      return setSpotsArr((old) => [...old, res.data]);
    });
  }, []);

  return (
    <div>
      <AppBarComponent />
      <Box mt={3}>
        <ProfileSection />
      </Box>
      {savedArr && <SavedMatchImgs savedArr={savedArr} />}
    </div>
  );
}
