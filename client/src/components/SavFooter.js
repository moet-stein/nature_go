import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import Rating from '@material-ui/lab/Rating';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import { AuthContext } from '../context/AuthContext';
import { SavedArrContext } from '../context/SavedArrContext';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <span {...other}>
      <SentimentVerySatisfiedIcon />
    </span>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function SavFooter({ saved }) {
  const classes = useStyles();
  const { userInfo } = useContext(AuthContext);
  const { savedArr, setSavedArr } = useContext(SavedArrContext);

  const deleteSaved = async (saved) => {
    setSavedArr(
      savedArr.filter((s) => s.savedImage._id !== saved.savedImage._id)
    );
    const body = {
      imageId: saved.savedImage._id,
      userId: userInfo._id,
    };
    const postReq = await axios.post(`/images/removesaved`, body);
  };

  const showIcon = (num) => {
    if (num === 0) {
      return (
        <Box className={classes.flex}>
          <PhotoCamera color="primary" />
          <Typography color="secondary">Upload</Typography>{' '}
        </Box>
      );
    } else if (num > 0 && num < 5) {
      return (
        <Box component="fieldset" borderColor="transparent">
          <Rating
            name="customized-icons"
            IconContainerComponent={IconContainer}
            value={saved.matching}
            readOnly
          />
        </Box>
      );
    } else {
      return (
        <Box className={classes.flex}>
          <EmojiNatureIcon color="secondary" />
          <Typography color="secondary">Matching Accepted!</Typography>{' '}
          <EmojiNatureIcon color="secondary" />
        </Box>
      );
    }
  };

  useEffect(() => {
    console.log(saved);
  }, []);

  return (
    <Box mt={2} className={classes.flex}>
      {showIcon(saved.matching)}

      <DeleteForeverIcon
        style={{ color: grey[600] }}
        onClick={() => deleteSaved(saved)}
      />
    </Box>
  );
}
