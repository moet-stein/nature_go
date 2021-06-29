// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';

// 2. initialize the context
const initFavSavContext = {
  matchedFavIdArr: [],
  matchedSaveIdArr: [],
};
// 3. create context
export const FavSavContext = createContext(initFavSavContext);

// 4. make provider => value / children
export const FavSavProvider = ({ children }) => {
  const [matchedFavIdArr, setMatchedFavIdArr] = useState(
    initFavSavContext.matchedFavIdArr
  );
  const [matchedSaveIdArr, setMatchedSaveIdArr] = useState(
    initFavSavContext.matchedSaveIdArr
  );

  return (
    <FavSavContext.Provider
      value={{
        matchedFavIdArr,
        setMatchedFavIdArr,
        matchedSaveIdArr,
        setMatchedSaveIdArr,
      }}
    >
      {children}
    </FavSavContext.Provider>
  );
};
