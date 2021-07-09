import React, { useContext } from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import StarRateIcon from '@material-ui/icons/StarRate';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import { AuthContext } from '../context/AuthContext';
import { CommentsContext } from '../context/CommentsContext';
import { NatureSpotsContext } from '../context/NatureSpotsContext';
import { useParams } from 'react-router-dom';
const serverURL = require('../config').serverURL;

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  grey: {
    color: grey[500],
  },
  marginIcon: {
    marginLeft: '30px',
  },
}));

export default function Comment({ comment, index }) {
  const classes = useStyles();
  let { spotId } = useParams();
  const { userInfo } = useContext(AuthContext);
  const { natureSpots, setNatureSpots, setNewAdded } = useContext(
    NatureSpotsContext
  );
  const {
    commentsArr,
    setCommentsArr,
    avarageRating,
    setAvarageRating,
    writeReview,
    setWriteReview,
    writeUpdate,
    setWriteUpdate,
    clickedIndex,
    setClickedIndex,
  } = useContext(CommentsContext);

  const handleDelete = async () => {
    const newArr = commentsArr.filter(
      (c) => c.comment !== comment.comment && c.createdAt !== comment.createdAt
    );
    await setCommentsArr(newArr);

    const newAve = Number(
      (
        newArr.map((c) => c.rating).reduce((a, b) => a + b, 0) / newArr.length
      ).toFixed(1)
    );
    await setAvarageRating(newAve);

    const body = {
      comment: comment.comment,
      createdAt: comment.createdAt,
    };
    const res = await axios.post(serverURL + '/comments/deletecomment', body);

    // update rating in naturespots context (so that user can see updated rating when going back to the page (without fetching ))
    const indexNat = natureSpots.findIndex((s) => s._id === spotId);
    let newSpotsArr = [...natureSpots];
    newSpotsArr[indexNat].rating = newAve;
    await setNatureSpots(newSpotsArr);
  };

  const handleOpen = () => {
    setWriteUpdate(true);
    setClickedIndex(index);
  };

  return (
    <Box>
      <Box display="flex">
        <Avatar
          alt={comment.author.username}
          src={comment.author.avatarUrl}
          className={classes.small}
        />
        <Box ml={1}>
          <Typography color="secondary" variant="body2">
            {comment.author.username}
          </Typography>
        </Box>
        <Box ml={2} display="flex">
          <StarRateIcon style={{ color: amber[600] }} />
          <Typography color="secondary" variant="body2">
            {comment.rating}
          </Typography>
        </Box>
        <Box ml={5}>
          <Typography variant="body2" className={classes.grey}>
            {comment.createdAt.substring(0, 10)}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2">{comment.comment}</Typography>
      {comment.author._id === userInfo._id && (
        <Box display="flex" justifyContent="flex-end">
          <CreateIcon style={{ color: blue[400] }} onClick={handleOpen} />
          {/* <UpdateForm comment={comment} index={index} /> */}
          <Box className={classes.marginIcon}>
            <DeleteOutlineIcon
              style={{ color: grey[400] }}
              onClick={handleDelete}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
