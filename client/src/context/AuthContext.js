// import jwt_decode from 'jwt-decode';

// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// 2. initialize the context
const initAuthContext = {
  userInfo: [],
  isUserThere: false,
};
// 3. create context
export const AuthContext = createContext(initAuthContext);

// 4. make provider => value / children
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initAuthContext.userInfo);
  const [isUserThere, setIsUserThere] = useState(initAuthContext.isUserThere);

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const getUserInfo = async () => {
      if (token !== null) {
        console.log(token !== null, userInfo);
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get('/users/profile', config);
        setUserInfo(res.data);
        console.log("I'm res.data from AuthContext", res.data);
      }
    };
    getUserInfo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isUserThere,
        setIsUserThere,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
