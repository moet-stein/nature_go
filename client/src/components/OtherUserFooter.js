import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import { AuthContext } from '../context/AuthContext';
import { OtherUserContext } from '../context/OtherUserContext';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: { width: '320px' },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  amber: {
    color: amber[700],
  },
  blue: {
    color: blue[600],
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

export default function OtherUserFooter({ pic, index }) {
  const classes = useStyles();
  const { otherUserId } = useParams();
  const [toggleGive, setToggleGive] = useState(true);
  const [hideButton, setHideButton] = useState(false);
  const {
    setHavMatPicArr,
    havMatPicArr,
    giveMatPicArr,
    setGiveMatPicArr,
  } = useContext(OtherUserContext);
  const { userInfo } = useContext(AuthContext);

  const handleGiveMatching = async (picId, index) => {
    if (toggleGive) {
      const arr1 = havMatPicArr[index].matching;
      const arr2 = arr1.push(userInfo._id);
      setHavMatPicArr(
        havMatPicArr.map((item, i) =>
          i === index
            ? {
                ...item,
                matching: arr1,
              }
            : item
        )
      );
      setToggleGive(false);
      const body = {
        userToGet: otherUserId,
        userToGive: userInfo._id,
        savPicId: picId,
      };
      const postReq = await axios.post(`/users/givematching`, body);
    } else {
      const updatedArr = havMatPicArr[index].matching.filter(
        (id) => id !== userInfo._id
      );

      setHavMatPicArr(
        havMatPicArr.map((item, i) =>
          i === index ? { ...item, matching: updatedArr } : item
        )
      );
      console.log(
        updatedArr,
        havMatPicArr.map((item, i) =>
          i === index ? { ...item, matching: updatedArr } : item
        )
      );
      setToggleGive(true);
      const body = {
        getBackFrom: otherUserId,
        userToGetBack: userInfo._id,
        savPicId: picId,
      };
      const postReq = await axios.post(`/users/getbackmatching`, body);
    }
  };

  const showIcon = (num) => {
    // if (num == 5) {
    //   setHideButton(true);
    // }
    if (num >= 0 && num < 5) {
      return (
        <Box component="fieldset" borderColor="transparent">
          <Rating
            name="customized-icons"
            IconContainerComponent={IconContainer}
            value={num}
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
    const arr = havMatPicArr[index].matching;
    if (arr.length > 0 && arr.includes(userInfo._id)) {
      setToggleGive(false);
    }
    if (arr.length > 0 && arr.length >= 5) {
      setHideButton(true);
    }

    console.log(havMatPicArr[index], arr);
  }, [toggleGive]);

  return (
    <Box display="flex" justifyContent="space-between" mt={2}>
      {showIcon(havMatPicArr.map((pic) => pic.matching)[index].length)}
      <Box>
        {!hideButton && (
          <React.Fragment>
            {toggleGive ? (
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => handleGiveMatching(pic._id, index)}
              >
                <Typography>Give</Typography>{' '}
                <SentimentVerySatisfiedIcon style={{ color: amber[700] }} />{' '}
              </Button>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                onClick={() => handleGiveMatching(pic._id, index)}
              >
                <Typography>Remove</Typography>{' '}
                <SentimentVerySatisfiedIcon style={{ color: blue[600] }} />
              </Button>
            )}
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
