import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  cardWidth: { width: '300px' },
  cardGrid: {
    height: 370,
  },
});

export default function NatureSpotsListCards({ natureSpots }) {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        {natureSpots.map((spot) => (
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            key={spot._id}
          >
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
                    height="140"
                    src="https://images.unsplash.com/photo-1568480289356-5a75d0fd47fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
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
                <Button size="small" color="primary">
                  Share
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
      </Grid>
    </div>
  );
}
