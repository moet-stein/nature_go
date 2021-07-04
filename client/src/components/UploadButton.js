import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function UploadButton() {
  const classes = useStyles();
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState(null);
  const [fileToSend, setFileToSend] = useState(null);

  const handleFile = async (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setFileToSend(event.target.files);
    setPreview(true);
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
      //
      console.log('success');
      // handle success
    } catch (error) {
      console.log('upload failed');
      // handle error
    }
  };

  return (
    <div className={classes.root}>
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
      {preview && (
        <Box>
          <Card>
            <CardMedia className={classes.media} image={file} />
          </Card>
          <Box m={2}>
            <Button variant="outlined" color="secondary" onClick={submitFile}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}
