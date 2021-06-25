// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
// 2. initialize the context
const initNatureSpotsContext = {
  natureSpots: [],
  newAdded: false,
};
// 3. create context
export const NatureSpotsContext = createContext(initNatureSpotsContext);

// 4. make provider => value / children
export const NatureSpotsProvider = ({ children }) => {
  const [natureSpots, setNatureSpots] = useState(
    initNatureSpotsContext.natureSpots
  );
  const [newAdded, setNewAdded] = useState(initNatureSpotsContext.newAdded);

  useEffect(() => {
    const getNatureSpots = async () => {
      try {
        const res = await axios.get('/naturespots');
        setNatureSpots(res.data);
        console.log('naturespotscontext', res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNatureSpots();
  }, [newAdded]);

  return (
    <NatureSpotsContext.Provider
      value={{
        natureSpots,
        setNatureSpots,
        newAdded,
        setNewAdded,
      }}
    >
      {children}
    </NatureSpotsContext.Provider>
  );
};
