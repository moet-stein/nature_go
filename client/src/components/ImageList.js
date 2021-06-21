import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(() => ({
  picWidth: {
    width: '40%',
    margin: '5px',
  },
}));

export default function ImageList({ picsArr }) {
  const classes = useStyle();
  return (
    <div>
      {picsArr.map((i) => (
        <img className={classes.picWidth} src={i} />
      ))}
    </div>
  );
}
