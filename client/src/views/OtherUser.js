import React, { useEffect, useState } from 'react';
import OtherUserProfile from '../components/OtherUserProfile';
import AppBarComponent from '../components/AppBarComponent';
import GoBack from '../components/GoBack';
import OtherUsersImgs from '../components/OtherUserImgs';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';

export default function OtherUser() {
  const { otherUserId } = useParams();
  const [otherUser, setOtherUser] = useState(null);

  const getOtherUserInfo = async () => {
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`/users/otheruser/${otherUserId}`, config);
      console.log(res.data);
      setOtherUser(res.data);
      return res.data;
    }
  };

  useEffect(async () => {
    await getOtherUserInfo();
    // console.log(otherUserId);
    // console.log(otherUser.myPics.map((p) => p.url));
  }, []);

  return (
    <div>
      <AppBarComponent />
      <GoBack />
      {otherUser && <OtherUserProfile otherUser={otherUser} />}
      {/* {otherUser &&
        otherUser.myPics.map((p) => {
          return <OtherUsersImgs />;
        })} */}
    </div>
  );
}
