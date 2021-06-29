// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 2. initialize the context
const initPicsArrContext = {
  picsArr: [],
};
// 3. create context
export const PicsArrContext = createContext(initPicsArrContext);

// 4. make provider => value / children
export const PicsArrProvider = ({ children }) => {
  const [picsArr, setPicsArr] = useState(initPicsArrContext.picsArr);

  useEffect(() => {}, []);

  return (
    <PicsArrContext.Provider
      value={{
        picsArr,
        setPicsArr,
      }}
    >
      {children}
    </PicsArrContext.Provider>
  );
};
