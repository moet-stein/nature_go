// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';
// 2. initialize the context
const initMarkerContext = {
  viewport: {},
  currentPlaceId: null,
};
// 3. create context
export const MarkerContext = createContext(initMarkerContext);

// 4. make provider => value / children
export const MarkerProvider = ({ children }) => {
  const [viewport, setViewport] = useState(initMarkerContext.viewport);
  const [currentPlaceId, setCurrentPlaceId] = useState(
    initMarkerContext.currentPlaceId
  );

  useEffect(() => {
    setViewport({
      width: '100vw',
      height: '70vh',
      latitude: 52.52,
      longitude: 13.405,
      zoom: 10,
    });
  }, []);

  return (
    <MarkerContext.Provider
      value={{
        viewport,
        setViewport,
        currentPlaceId,
        setCurrentPlaceId,
      }}
    >
      {children}
    </MarkerContext.Provider>
  );
};
