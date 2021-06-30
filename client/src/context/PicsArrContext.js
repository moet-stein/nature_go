// 1. import the modules
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 2. initialize the context
const initPicsArrContext = {
  naturespot: '',
  picturesArr: [],
  picsIdArr: [],
  fetch: false,
};
// 3. create context
export const PicsArrContext = createContext(initPicsArrContext);

// 4. make provider => value / children
export const PicsArrProvider = ({ children }) => {
  const [naturespot, setNaturespot] = useState(initPicsArrContext.naturespot);
  const [picturesArr, setPicturesArr] = useState(
    initPicsArrContext.picturesArr
  );
  const [picsIdArr, setPicsIdArr] = useState(initPicsArrContext.picsIdArr);
  const [fetch, setFetch] = useState(initPicsArrContext.fetch);

  useEffect(async () => {
    // const res = await axios.get('/natimages', {
    //   params: { naturespotId: naturespot },
    // });
    // setPicturesArr(res.data);
    console.log('naturespot', naturespot);
    console.log('picturesArr', picturesArr);
  }, []);

  return (
    <PicsArrContext.Provider
      value={{
        naturespot,
        setNaturespot,
        picturesArr,
        setPicturesArr,
        fetch,
        setFetch,
        picsIdArr,
        setPicsIdArr,
      }}
    >
      {children}
    </PicsArrContext.Provider>
  );
};
