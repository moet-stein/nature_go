// 1. import the modules
import React, { createContext, useState } from 'react';

// 2. initialize the context
const initOtherUserContext = {
  otherUser: {},
  havMatPicArr: [],
  giveMatPicArr: [],
};
// 3. create context
export const OtherUserContext = createContext(initOtherUserContext);

// 4. make provider => value / children
export const OtherUserProvider = ({ children }) => {
  const [otherUser, setOtherUser] = useState(initOtherUserContext.otherUser);
  const [havMatPicArr, setHavMatPicArr] = useState(
    initOtherUserContext.havMatPicArr
  );
  const [giveMatPicArr, setGiveMatPicArr] = useState(
    initOtherUserContext.giveMatPicArr
  );

  return (
    <OtherUserContext.Provider
      value={{
        otherUser,
        setOtherUser,
        havMatPicArr,
        setHavMatPicArr,
        giveMatPicArr,
        setGiveMatPicArr,
      }}
    >
      {children}
    </OtherUserContext.Provider>
  );
};
