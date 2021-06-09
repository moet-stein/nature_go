import React from 'react';
import Typography from '@material-ui/core/Typography';
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
import 'mapbox-gl/dist/mapbox-gl.css';
const mapBoxToken = process.env.MAPBOX_TOKEN;

export default function NatureSpots() {
  return (
    <div>
      <Typography variant="h1">Nature Spots LIST COMES HERE</Typography>
    </div>
  );
}
