// 1. import the modules
import React, { createContext, useState } from 'react';

// 2. initialize the context
const initCommentsContext = {
  commentsArr: [],
  ratingsArr: [],
  avarageRating: null,
  writeReview: false,
  writeUpdate: false,
  clickedIndex: 0,
};
// 3. create context
export const CommentsContext = createContext(initCommentsContext);

// 4. make provider => value / children
export const CommentsProvider = ({ children }) => {
  const [commentsArr, setCommentsArr] = useState(
    initCommentsContext.commentsArr
  );
  const [ratingsArr, setRatingsArr] = useState(initCommentsContext.ratingsArr);
  const [avarageRating, setAvarageRating] = useState(
    initCommentsContext.avarageRating
  );
  const [writeReview, setWriteReview] = useState(
    initCommentsContext.writeReview
  );
  const [writeUpdate, setWriteUpdate] = useState(
    initCommentsContext.writeUpdate
  );
  const [clickedIndex, setClickedIndex] = useState(
    initCommentsContext.clickedIndex
  );

  return (
    <CommentsContext.Provider
      value={{
        commentsArr,
        setCommentsArr,
        ratingsArr,
        setRatingsArr,
        avarageRating,
        setAvarageRating,
        writeReview,
        setWriteReview,
        writeUpdate,
        setWriteUpdate,
        clickedIndex,
        setClickedIndex,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};
