import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Room from '@material-ui/icons/Room';

const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: '100vw',
    height: '100vh',
  },
}));

export default function SpotDetails() {
  const classes = useStyles();
  const location = useLocation();
  const { spot } = location.state;
  const [viewport, setViewport] = useState({
    width: 200,
    height: 200,
    latitude: spot.lat,
    longitude: spot.long,
    zoom: 11,
  });

  useEffect(() => {
    console.log(spot);
  }, []);
  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2">{spot.title}</Typography>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.maxW} variant="h5">
            {spot.desc}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
