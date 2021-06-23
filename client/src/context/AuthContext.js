// import jwt_decode from 'jwt-decode';

// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// 2. initialize the context
const initAuthContext = {
  userInfo: [],
};
// 3. create context
export const AuthContext = createContext(initAuthContext);

// 4. make provider => value / children
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initAuthContext.userInfo);

  useEffect(async () => {
    const token = window.localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get('/users/profile', config);
    setUserInfo(res.data);
    console.log(res.data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
