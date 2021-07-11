import React, { useContext, useEffect } from 'react';
import NoUploads from '../img/nouploads.gif';
import UserHeader from './UserHeader';
import FavSav from './FavSav';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { PicsArrContext } from '../context/PicsArrContext';
import { AuthContext } from '../context/AuthContext';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '400px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  '@media only screen and (max-width: 600px)': {
    root: {
      width: '160px',
    },
  },
}));

export default function Images() {
  const classes = useStyle();
  const { picturesArr } = useContext(PicsArrContext);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <React.Fragment>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        {picturesArr.map((pic) => {
          return (
            <Box m={1}>
              <Card key={pic._id} className={classes.root}>
                <UserHeader pic={pic} />
                <CardMedia className={classes.media} image={pic.url} />
                {userInfo && Object.keys(userInfo).length !== 0 && (
                  <FavSav pic={pic} />
                )}
              </Card>
            </Box>
          );
        })}
      </Box>
      {picturesArr.length == 0 && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography color="secondary" variant="h4">
            No Uploads Yet
          </Typography>
          <Box mb={10}>
            <img alt="nofavorites" src={NoUploads} width="250" />
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
}
