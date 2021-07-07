import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import GoBack from '../components/GoBack';
import Images from '../components/Images';
import UploadButton from '../components/UploadButton';
import ReactMapGL, { Marker } from 'react-map-gl';
import AppBarComponent from '../components/AppBarComponent';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { AuthContext } from '../context/AuthContext';
import { FavSavContext } from '../context/FavSavContext';
import { PicsArrContext } from '../context/PicsArrContext';

const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100vw',
    height: '100vh',
  },
  boxWidth: {
    width: '300px',
    display: 'flex',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function SpotDetails() {
  const classes = useStyles();
  const location = useLocation();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const { spot } = location.state;
  const {
    setMatchedFavIdArr,
    setMatchedSaveIdArr,
    setMatchedMyPicIdArr,
  } = useContext(FavSavContext);
  const {
    setNaturespot,
    picturesArr,
    setPicturesArr,
    setPicsIdArr,
  } = useContext(PicsArrContext);
  const [hideDesc, setHideDesc] = useState(false);
  const [loading, setLoading] = useState(true);

  const [viewport, setViewport] = useState({
    width: 350,
    height: 200,
    latitude: spot.lat,
    longitude: spot.long,
    zoom: 11,
  });

  const longDesc = spot.desc.length > 200 ? true : false;
  const displayDesc = spot.desc.slice(0, 200) + '...';

  const showMoreDesc = () => {
    hideDesc ? setHideDesc(false) : setHideDesc(true);
  };

  const getUserInfo = async () => {
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(`/users/profile`, config);
      setUserInfo(res.data);
      return res.data;
    }
  };

  useEffect(async () => {
    const userData = await getUserInfo();
    await setPicturesArr([]);
    if (longDesc) {
      setHideDesc(true);
    }
    setNaturespot(spot._id);
    const res = await axios.get(`/images/${spot._id}`);
    await setPicturesArr(res.data.reverse());
    await setPicsIdArr(res.data.map((p) => p.url));

    if (userData) {
      console.log(userData);
      if (userData.favoritePics) {
        await setMatchedFavIdArr(
          res.data
            .map((p) => p.url)
            .filter((url) =>
              userData.favoritePics.map((p) => p.url).includes(url)
            )
        );
      }
      if (userData.savedPics) {
        const savedIds = userData.savedPics.map((obj) => obj.originalImage);
        console.log(savedIds);
        await setMatchedSaveIdArr(
          res.data.map((p) => p.url).filter((url) => savedIds.includes(url))
        );
      }
      if (userData.myPics) {
        await setMatchedMyPicIdArr(
          res.data
            .map((p) => p.url)
            .filter((url) => userData.myPics.map((p) => p.url).includes(url))
        );
      }
    }

    setLoading(false);
  }, []);

  return (
    <div className={classes.root}>
      <AppBarComponent />
      <GoBack />
      <Grid container>
        <Grid item xs={12}>
          <Typography color="secondary" variant="h3">
            {spot.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.center} mt={2}>
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={mapBoxToken}
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              mapStyle="mapbox://styles/moepii/ckppic7c80e3b17pdh4k1pfvk"
              transitionDuration="50"
            >
              <Marker
                latitude={spot.lat}
                longitude={spot.long}
                offsetLeft={-viewport.zoom * 1.5}
                offsetTop={-viewport.zoom * 3}
              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 3,
                    color: 'tomato',
                    cursor: 'pointer',
                  }}
                  // onClick={() => handleMarkerClick(spot._id, spot.lat, spot.long)}
                />
              </Marker>
            </ReactMapGL>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box className={classes.center} mt={2}>
            <Box className={classes.boxWidth}>
              {hideDesc ? (
                <Typography className={classes.maxW} variant="body2">
                  {displayDesc}
                </Typography>
              ) : (
                <Typography className={classes.maxW} variant="body2">
                  {spot.desc}
                </Typography>
              )}

              <Box mt={12} className={classes.noPadding}>
                {hideDesc ? (
                  <IconButton onClick={showMoreDesc}>
                    <ArrowDownwardIcon fontSize="small" />
                    <Typography className={classes.maxW} variant="body2">
                      See more
                    </Typography>
                  </IconButton>
                ) : (
                  <IconButton onClick={showMoreDesc}>
                    <ArrowUpwardIcon fontSize="small" />
                    <Typography className={classes.maxW} variant="body2">
                      Hide
                    </Typography>
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
        {userInfo.length > 0 && (
          <Grid item xs={12}>
            <UploadButton natureId={spot._id} userInfo={userInfo} />
          </Grid>
        )}
      </Grid>
      {!loading && <Images />}
    </div>
  );
}
