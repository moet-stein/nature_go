import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Room from '@material-ui/icons/Room';
import Star from '@material-ui/icons/Star';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core';
const mapBoxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const useStyle = makeStyles(() => ({
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    width: 'max-content',
    color: 'teal',
    fontSize: '13px',
    borderBottom: '1px dashed teal',
    margin: '3px 0',
  },
}));

export default function NatureSpots() {
  const classes = useStyle();
  const currentUser = 'Philipp';
  const [natureSpots, setNatureSpots] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newSpot, setNewSpot] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '50vh',
    latitude: 52.52,
    longitude: 13.405,
    zoom: 8,
  });

  useEffect(() => {
    const getNatureSpots = async () => {
      try {
        const res = await axios.get('/naturespots');
        setNatureSpots(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNatureSpots();
  }, []);

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

  return (
    <div>
      <Box>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={mapBoxToken}
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          mapStyle="mapbox://styles/moepii/ckppic7c80e3b17pdh4k1pfvk"
          onDblClick={handleAddClick}
          transitionDuration="200"
        >
          {natureSpots.map((spot) => (
            <>
              <Marker
                latitude={spot.lat}
                longitude={spot.long}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <Room
                  style={{
                    fontSize: viewport.zoom * 3,
                    color:
                      spot.username === currentUser ? 'tomato' : 'slateblue',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    handleMarkerClick(spot._id, spot.lat, spot.long)
                  }
                />
              </Marker>
              {spot._id === currentPlaceId && (
                <Popup
                  latitude={spot.lat}
                  longitude={spot.long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="right"
                  onClose={() => setCurrentPlaceId(null)}
                >
                  <div className={classes.flexColumn}>
                    <label className={classes.label}>Place</label>
                    <Typography gutterBottom vairant="h5">
                      {spot.title}
                    </Typography>
                    <label className={classes.label}>Review</label>

                    <Typography
                      gutterBottom
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {spot.desc}
                    </Typography>
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
                        Created by <b>{spot.username}</b>
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {format(spot.createdAt)}
                      </Typography>
                    </Box>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {newSpot && (
            <Popup
              latitude={newSpot.lat}
              longitude={newSpot.long}
              closeButton={true}
              closeOnClick={false}
              anchor="right"
              onClose={() => setNewSpot(null)}
            >
              hello
            </Popup>
          )}
        </ReactMapGL>
      </Box>
      <Typography variant="h1">Nature Spots LIST COMES HERE</Typography>
    </div>
  );
}
