import React, { useState, useContext } from 'react';
import AppBarComponent from '../components/AppBarComponent';
import NatureSpotsListCards from '../components/NatureSpotsListCards';
import axios from 'axios';
import { format } from 'timeago.js';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from 'react-mapbox-gl-geocoder';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Room from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NatureSpotsContext } from '../context/NatureSpotsContext';
import { MarkerContext } from '../context/MarkerContext';

const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100vw',
    height: '100vh',
  },

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  comeTop: { zIndex: '1' },
  label: {
    width: 'max-content',
    color: 'teal',
    fontSize: '13px',
    borderBottom: '1px dashed teal',
    margin: '3px 0',
    marginBottom: '10px',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
  textWidth: {
    width: 150,
  },
  white: {
    backgroundColor: blueGrey[500],
    color: blueGrey[50],
  },
  leftFloat: {
    float: 'right',
    marginTop: 5,
    marginRight: 5,
  },
}));

export default function NatureSpots() {
  const classes = useStyle();
  // const [currentUser, setCurrentUser] = useState(null);
  // const [natureSpots, setNatureSpots] = useState([]);
  // const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newSpot, setNewSpot] = useState(null);
  const [rating, setRating] = useState(3);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const { userInfo, isUserThere } = useContext(AuthContext);
  const { natureSpots, setNatureSpots, setNewAdded } = useContext(
    NatureSpotsContext
  );
  const {
    viewport,
    setViewport,
    currentPlaceId,
    setCurrentPlaceId,
  } = useContext(MarkerContext);

  const onSelected = (viewport) => {
    setViewport(viewport);
  };

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewSpot({
      lat,
      long,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewAdded(false);
    const newSpotPost = {
      user: userInfo._id,
      title,
      desc,
      rating,
      lat: newSpot.lat,
      long: newSpot.long,
    };

    try {
      const res = await axios.post('/naturespots', newSpotPost);
      setNatureSpots([...natureSpots, res.data]);
      setNewAdded(true);
      setNewSpot(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {' '}
      <AppBarComponent />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={mapBoxToken}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            mapStyle="mapbox://styles/moepii/ckppic7c80e3b17pdh4k1pfvk"
            onDblClick={handleAddClick}
            // transitionDuration="50"
          >
            <Geocoder
              mapboxApiAccessToken={mapBoxToken}
              onSelected={(viewport) => onSelected(viewport)}
              viewport={viewport}
              hideOnSelect={true}
              value=""
              position="top-left"
              // queryParams={params}
            />
            {natureSpots.map((spot) => (
              <div key={spot._id}>
                <Marker
                  latitude={spot.lat}
                  longitude={spot.long}
                  offsetLeft={-viewport.zoom * 1.5}
                  offsetTop={-viewport.zoom * 3}
                >
                  <Room
                    style={{
                      fontSize: viewport.zoom * 3,
                      color:
                        spot.user.username === userInfo.username
                          ? 'tomato'
                          : 'slateblue',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      handleMarkerClick(spot._id, spot.lat, spot.long)
                    }
                  />
                </Marker>
                {spot._id === currentPlaceId && (
                  <Popup
                    className={classes.comeTop}
                    latitude={spot.lat}
                    longitude={spot.long}
                    closeButton={true}
                    closeOnClick={false}
                    anchor="right"
                    onClose={() => setCurrentPlaceId(null)}
                  >
                    <div className={classes.flexColumn}>
                      <label className={classes.label}>Place</label>
                      <Box className={classes.textWidth}>
                        <Typography gutterBottom vairant="h5">
                          {spot.title}
                        </Typography>
                      </Box>
                      <label className={classes.label}>Review</label>
                      <Box className={classes.textWidth}>
                        <Typography
                          gutterBottom
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="left"
                        >
                          {spot.desc.length > 80
                            ? spot.desc.slice(0, 80) + '...'
                            : spot.desc}
                        </Typography>
                      </Box>
                      <label className={classes.label}>Rating</label>
                      <Box component="fieldset" borderColor="transparent">
                        <Rating name="read-only" value={spot.rating} readOnly />
                      </Box>
                      <label className={classes.label}>Infomation</label>
                      <Box>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Created by <b>{spot.user.username}</b>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {format(spot.createdAt)}
                        </Typography>
                      </Box>
                      <Box mt={2}>
                        <Link
                          to={{
                            pathname: `details/${spot._id}`,
                            state: {
                              spot,
                            },
                          }}
                          // to={`details/${spot._id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <Button color="secondary" variant="outlined">
                            See More
                          </Button>
                        </Link>
                      </Box>
                    </div>
                  </Popup>
                )}
              </div>
            ))}
            {newSpot && isUserThere && (
              <Popup
                latitude={newSpot.lat}
                longitude={newSpot.long}
                closeButton={true}
                closeOnClick={false}
                anchor="right"
                onClose={() => setNewSpot(null)}
              >
                <div>
                  <form className={classes.flexColumn} onSubmit={handleSubmit}>
                    <label className={classes.label}>Title</label>
                    <TextField
                      id="outlined-basic"
                      label="Enter a title"
                      variant="outlined"
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <label className={classes.label}>Review</label>
                    <TextField
                      id="outlined-basic"
                      label="About this place"
                      variant="outlined"
                      multiline
                      rows={4}
                      onChange={(e) => setDesc(e.target.value)}
                    />

                    <label className={classes.label}>Rating</label>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />

                    <Button
                      className={classes.marginTop}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Add new spot
                    </Button>
                  </form>
                </div>
              </Popup>
            )}
          </ReactMapGL>
        </Grid>

        <NatureSpotsListCards natureSpots={natureSpots} />
      </Grid>
    </React.Fragment>
  );
}
