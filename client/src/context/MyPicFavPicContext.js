// 1. import the modules
import React, { createContext, useState } from 'react';

// 2. initialize the context
const initMyPicFavPicContext = {
  myPicsArr: [],
  favPicsArr: [],
};
// 3. create context
export const MyPicFavPicContext = createContext(initMyPicFavPicContext);

// 4. make provider => value / children
export const MyPicFavPicProvider = ({ children }) => {
  const [myPicsArr, setMyPicsArr] = useState(initMyPicFavPicContext.myPicsArr);
  const [favPicsArr, setFavPicsArr] = useState(
    initMyPicFavPicContext.favPicsArr
  );

  return (
    <MyPicFavPicContext.Provider
      value={{
        myPicsArr,
        setMyPicsArr,
        favPicsArr,
        setFavPicsArr,
      }}
    >
      {children}
    </MyPicFavPicContext.Provider>
  );
};
