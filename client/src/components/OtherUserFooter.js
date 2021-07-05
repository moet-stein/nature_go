import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

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

export default function OtherUserFooter({ pic }) {
  const classes = useStyles();
  const showIcon = (num) => {
    if (num < 5) {
      return (
        <Box component="fieldset" borderColor="transparent">
          <Rating
            name="customized-icons"
            IconContainerComponent={IconContainer}
            value={pic.matching.length}
            readOnly
          />
          {/* <Typography color="secondary" variant="body2">
                Matching accepted: {num}
              </Typography> */}
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
  return <div>{showIcon(pic.matching.length)}</div>;
}
