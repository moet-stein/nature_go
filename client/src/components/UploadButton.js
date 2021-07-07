import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import grey from '@material-ui/core/colors/grey';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { PicsArrContext } from '../context/PicsArrContext';
import { FavSavContext } from '../context/FavSavContext';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  card: { width: '320px' },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cancel: {
    color: grey[400],
  },
}));

export default function UploadButton({ natureId, userInfo }) {
  const classes = useStyles();
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState(null);
  const [fileToSend, setFileToSend] = useState(null);
  const { picturesArr, setPicturesArr } = useContext(PicsArrContext);
  const { matchedMyPicIdArr, setMatchedMyPicIdArr } = useContext(FavSavContext);

  const handleFile = async (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileToSend(event.target.files);
    setPreview(true);
  };

  const uploadImg = async (url) => {
    setPreview(false);
    const body = {
      url: url,
      natureId: natureId,
      authorId: userInfo._id,
    };
    const postReq = await axios.post(`/images/uploadimage`, body);
    const newPostObj = postReq.data.newImage;
    newPostObj.author = {
      avatarUrl: userInfo.avatarUrl,
      username: userInfo.username,
      _id: userInfo._id,
    };
    await setPicturesArr((oldArr) => [...oldArr, newPostObj].reverse());
    await setMatchedMyPicIdArr((oldArr) => [...oldArr, url]);
    console.log(postReq.data.newImage);
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
      console.log(res.data.Location);
      // post req to upload photo
      await uploadImg(res.data.Location);
      console.log('success');
      // handle success
    } catch (error) {
      console.log('upload failed');
      // handle error
    }
  };

  const cancel = () => {
    setFile(null);
    setFileToSend(null);
    setPreview(false);
  };

  useState(() => {
    console.log(userInfo && Object.keys(userInfo).length === 0);
  }, []);

  return (
    <div className={classes.root}>
      {userInfo && Object.keys(userInfo).length !== 0 && (
        <React.Fragment>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={(e) => handleFile(e)}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="secondary"
              component="span"
              startIcon={<PhotoCamera />}
            >
              Upload
            </Button>
          </label>
        </React.Fragment>
      )}
      {preview && (
        <Box m={3}>
          <Typography color="secondary" variant="h5">
            Preview
          </Typography>
          <Box display="flex" justifyContent="center">
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={file} />
            </Card>
          </Box>
          <Box m={2} display="flex" justifyContent="space-around">
            <Button
              className={classes.cancel}
              variant="outlined"
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button variant="outlined" color="secondary" onClick={submitFile}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}
