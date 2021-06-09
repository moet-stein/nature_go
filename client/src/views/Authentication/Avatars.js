import React, { useContext, useState } from 'react';
// import Carousel from 'react-material-ui-carousel';
import Radio from '@material-ui/core/Radio';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar1 from '../../img/avatar1.png';
import Avatar2 from '../../img/avatar2.png';
import Avatar3 from '../../img/avatar3.png';
import Avatar4 from '../../img/avatar4.png';
import Avatar5 from '../../img/avatar5.png';

const useStyles = makeStyles(() => ({
  avatarSize: { width: 70, height: 70 },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Avatars() {
  const [selectedPic, setSelectedPic] = useState('Avatar1');
  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedPic(event.target.value);
  };

  return (
    <Box display="flex" alignItems="cetner" justifyContent="space-between">
      {/* <Carousel autoPlay="false"> */}
      <Box className={classes.flexColumn}>
        <img className={classes.avatarSize} src={Avatar1} />
        <Radio
          checked={selectedPic === 'Avatar1'}
          onChange={handleChange}
          value="Avatar1"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'Avatar1' }}
        />
      </Box>
      <Box className={classes.flexColumn}>
        <img className={classes.avatarSize} src={Avatar2} />
        <Radio
          checked={selectedPic === 'Avatar2'}
          onChange={handleChange}
          value="Avatar2"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'Avatar2' }}
        />
      </Box>
      <Box className={classes.flexColumn}>
        <img className={classes.avatarSize} src={Avatar3} />
        <Radio
          checked={selectedPic === 'Avatar3'}
          onChange={handleChange}
          value="Avatar3"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'Avatar3' }}
        />
      </Box>
      <Box className={classes.flexColumn}>
        <img className={classes.avatarSize} src={Avatar4} />
        <Radio
          checked={selectedPic === 'Avatar4'}
          onChange={handleChange}
          value="Avatar4"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'Avatar4' }}
        />
      </Box>
      <Box className={classes.flexColumn}>
        <img className={classes.avatarSize} src={Avatar5} />
        <Radio
          checked={selectedPic === 'Avatar5'}
          onChange={handleChange}
          value="Avatar5"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'Avatar5' }}
        />
      </Box>
      {/* </Carousel> */}
    </Box>
  );
}
