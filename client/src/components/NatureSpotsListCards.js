import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NoImages from '../img/confirm.png';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { MarkerContext } from '../context/MarkerContext';

const useStyles = makeStyles({
  cardWidth: { width: '300px' },
  cardGrid: {
    height: 370,
  },
});

export default function NatureSpotsListCards({ natureSpots }) {
  const classes = useStyles();
  const {
    viewport,
    setViewport,
    currentPlaceId,
    setCurrentPlaceId,
  } = useContext(MarkerContext);
  const [filteredArr, setFilteredArr] = useState(natureSpots);
  const [loading, setLoading] = useState(true);

  const showOnMap = (id, lat, long) => {
    window.scrollTo(0, 0);
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const thumbnail = (spot) => {
    return spot.images.length > 0 ? spot.images[0].url : NoImages;
  };

  const handleSearch = (e) => {
    const filArr = natureSpots.filter((s) =>
      s.title.toLowerCase().includes(e.target.value)
    );
    setFilteredArr(filArr);
  };

  useEffect(() => {
    setFilteredArr(natureSpots);
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <Box mt={3}>
        <Typography variant="h6" color="secondary">
          Search for a spot
        </Typography>
        <TextField
          id="standard-basic"
          label="type here"
          onChange={(e) => handleSearch(e)}
        />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {!loading &&
          filteredArr.map((spot) => (
            <Box m={2} key={spot._id}>
              <Card className={classes.cardWidth}>
                <Link
                  to={{
                    pathname: `details/${spot._id}`,
                    state: {
                      spot,
                    },
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={spot.title}
                      height="220"
                      src={thumbnail(spot)}
                      title={spot.title}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        color="secondary"
                        variant="h5"
                        component="h2"
                      >
                        {spot.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {spot.desc.length > 80
                          ? spot.desc.slice(0, 80) + '...'
                          : spot.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => showOnMap(spot._id, spot.lat, spot.long)}
                  >
                    On Map
                  </Button>
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
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Box>
          ))}
      </Box>
    </React.Fragment>
  );
}
