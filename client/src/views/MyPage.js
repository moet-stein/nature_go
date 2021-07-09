import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBarComponent from '../components/AppBarComponent';
import ProfileSection from '../components/ProfileSection';
import MyPageImages from '../components/MyPageImages';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import green from '@material-ui/core/colors/green';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles(() => ({
  color: {
    color: green[600],
  },
}));

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
  const classes = useStyles();

  const handleChange = (event) => {
    setFavMyPics(event.target.checked);
  };

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
              <Typography color="primary">My Pics</Typography>
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
                className={classes.color}
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Box>
      <MyPageImages showFavPics={showFavPics} />
    </div>
  );
}
