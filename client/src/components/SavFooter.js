import React, { useContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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

export default function SavFooter({ saved }) {
  const classes = useStyles();
  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState(null);
  const [fileToSend, setFileToSend] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const { savedArr, setSavedArr } = useContext(SavedArrContext);

  const deleteSaved = async (saved) => {
    setSavedArr(
      savedArr.filter((s) => s.originalImage !== saved.originalImage)
    );
    const body = {
      userId: userInfo._id,
      origUrl: saved.originalImage,
    };
    const postReq = await axios.post(`/images/removesaved`, body);
  };

  const handleFile = async (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileToSend(event.target.files);
    setPreview(true);
  };

  const uploadImg = async (url) => {
    setPreview(false);
    const body = {
      url: url,
      user: userInfo._id,
      picId: saved._id,
    };
    const postReq = await axios.post(`/users/uploadmatching`, body);
    await setSavedArr(
      savedArr.map((item) =>
        item._id == saved._id ? { ...item, matchedImage: url } : item
      )
    );
  };

  const submitFile = async () => {
    try {
      if (!fileToSend) {
        throw new Error('Select a file first!');
      }
      const formData = new FormData();
      formData.append('file', fileToSend[0]);
      const res = await axios.post(`/aws/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // post req to upload photo
      await uploadImg(res.data.Location);
      console.log('success');
      // handle success
    } catch (error) {
      console.log('upload failed');
      // handle error
    }
    setPreview(false);
  };

  const cancelUpload = () => {
    setPreview(false);
    setFile(null);
    setFileToSend(null);
  };

  const reset = () => {
    setPreview(false);
    setFile(null);
    setFileToSend(null);
  };

  const showIcon = (num) => {
    if (!preview) {
      if (saved.matchedImage.length <= 0) {
        return (
          <Box className={classes.flex}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id={saved._id}
              multiple
              type="file"
              onClick={reset}
              onChange={(e) => handleFile(e)}
            />
            <label htmlFor={saved._id}>
              <Button
                variant="contained"
                color="secondary"
                component="span"
                startIcon={<PhotoCamera />}
              >
                Upload
              </Button>
            </label>
          </Box>
        );
      } else if (num < 5) {
        return (
          <Box component="fieldset" borderColor="transparent">
            <Rating
              name="customized-icons"
              IconContainerComponent={IconContainer}
              value={saved.matching.length}
              readOnly
            />
            <Typography color="secondary" variant="body2">
              Matching accepted: {num}
            </Typography>
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
    }
  };

  return (
    <React.Fragment>
      <Box mt={2} className={classes.flex}>
        {showIcon(saved.matching.length)}
        {!preview && (
          <DeleteForeverIcon
            style={{ color: grey[600] }}
            onClick={() => deleteSaved(saved)}
          />
        )}
      </Box>
      {preview && (
        <Box
          m={3}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography color="secondary" variant="h5">
            Preview
          </Typography>
          <Card className={classes.card}>
            <CardMedia className={classes.media} image={file} />
          </Card>
          <Box m={2} display="flex" justifyContent="space-between">
            <Box mt={2} mr={2}>
              <Button
                variant="outlined"
                style={{ color: grey[600] }}
                onClick={cancelUpload}
              >
                Cancel
              </Button>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={submitFile}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
}
