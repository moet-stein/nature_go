import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AppBarComponent from '../components/AppBarComponent';
import ProfileSection from '../components/ProfileSection';
import Images from '../components/Images';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../context/AuthContext';

// const myPics = [
//   'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1140&q=80',
//   'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80',
//   'https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//   'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//   'https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
//   'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=606&q=80',
//   'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
// ];

const favorites = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fG5hdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  'https://images.unsplash.com/photo-1531386450450-969f935bd522?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1049&q=80',
  'https://images.unsplash.com/photo-1487622750296-6360190669a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
];

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.info.light}`,
    backgroundColor: theme.palette.info.light,
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

export default function MyPage() {
  const [showFavPics, setFavMyPics] = useState(false);
  const [myPicsArr, setMyPicsArr] = useState([]);
  const [favPicsArr, setFavPicsArr] = useState([]);
  const { userInfo } = useContext(AuthContext);

  const handleChange = (event) => {
    setFavMyPics(event.target.checked);
  };

  // useEffect(async () => {
  //   const myPics = await axios.get('/mypics', { params: { id: userInfo._id } });
  //   setMyPicsArr(myPics.data);
  //   console.log(myPicsArr);
  // }, []);

  return (
    <div>
      <AppBarComponent />
      <Box mt={3}>
        <ProfileSection />
      </Box>
      <Box mt={3} display="flex" justifyContent="center" alignItems="center">
        <FormGroup>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>
              <Typography>My Pics</Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={showFavPics}
                    onChange={handleChange}
                    name="checkedB"
                  />
                }
                label="Favorites"
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
      {/* {!showFavPics && (
        <Box mt={3}>
          <Typography variant="h5">My Nature Pics</Typography>
          <Images picsArr={myPicsArr} />
        </Box>
      )}
      {showFavPics && (
        <Box mt={3}>
          <Typography variant="h5">Favorites</Typography>
          <Images picsArr={favPicsArr} />
        </Box>
      )} */}
    </div>
  );
}
