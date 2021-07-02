// 1. import the modules
import React, { createContext, useState } from 'react';

// 2. initialize the context
const initSavedArrContext = {
  savedArr: [],
  spotsArr: [],
};
// 3. create context
export const SavedArrContext = createContext(initSavedArrContext);

// 4. make provider => value / children
export const SavedArrProvider = ({ children }) => {
  const [savedArr, setSavedArr] = useState(initSavedArrContext.savedArr);
  const [spotsArr, setSpotsArr] = useState(initSavedArrContext.spotsArr);

  return (
    <SavedArrContext.Provider
      value={{
        savedArr,
        setSavedArr,
        spotsArr,
        setSpotsArr,
      }}
    >
      {children}
    </SavedArrContext.Provider>
  );
};
