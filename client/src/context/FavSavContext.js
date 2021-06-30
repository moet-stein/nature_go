// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';

// 2. initialize the context
const initFavSavContext = {
  favIdArr: [],
  savIdArr: [],
  myPicIdArr: [],
  matchedFavIdArr: [],
  matchedSaveIdArr: [],
  matchedMyPicIdArr: [],
};
// 3. create context
export const FavSavContext = createContext(initFavSavContext);

// 4. make provider => value / children
export const FavSavProvider = ({ children }) => {
  const [favIdArr, setFavIdArr] = useState(initFavSavContext.favIdArr);
  const [savIdArr, setSavIdArr] = useState(initFavSavContext.savIdArr);
  const [myPicIdArr, setMyPicIdArr] = useState(initFavSavContext.myPicIdArr);
  const [matchedFavIdArr, setMatchedFavIdArr] = useState(
    initFavSavContext.matchedFavIdArr
  );
  const [matchedSaveIdArr, setMatchedSaveIdArr] = useState(
    initFavSavContext.matchedSaveIdArr
  );
  const [matchedMyPicIdArr, setMatchedMyPicIdArr] = useState(
    initFavSavContext.matchedMyPicIdArr
  );

  return (
    <FavSavContext.Provider
      value={{
        favIdArr,
        setFavIdArr,
        savIdArr,
        setSavIdArr,
        matchedFavIdArr,
        setMatchedFavIdArr,
        matchedSaveIdArr,
        setMatchedSaveIdArr,
        myPicIdArr,
        setMyPicIdArr,
        matchedMyPicIdArr,
        setMatchedMyPicIdArr,
      }}
    >
      {children}
    </FavSavContext.Provider>
  );
};
