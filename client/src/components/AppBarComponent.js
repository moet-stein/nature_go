import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AppBar from '@material-ui/core/AppBar';
import AppLogo from '../img/avatar1.png';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExploreIcon from '@material-ui/icons/Explore';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import grey from '@material-ui/core/colors/grey';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FavSavContext } from '../context/FavSavContext';
import { PicsArrContext } from '../context/PicsArrContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: { width: '30px', height: '30px', borderRadius: '20px' },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  fullList: {
    width: 'auto',
  },
  activeBg: {
    backgroundColor: grey[300],
  },
}));

export default function AppBarComponent() {
  const classes = useStyles();
  const location = useLocation();
  const [state, setState] = useState({
    left: false,
  });
  const [active, setActive] = useState('');
  const { userInfo, setUserInfo, isUserThere, setIsUserThere } = useContext(
    AuthContext
  );
  const {
    setFavIdArr,

    setSavIdArr,
  } = useContext(FavSavContext);
  const { fetch } = useContext(PicsArrContext);
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = async () => {
    const user = { _id: userInfo._id };
    setUserInfo([]);
    setIsUserThere(false);
    window.localStorage.removeItem('token');
    history.push('/');
    await axios.post('/users/logout', user);
  };

  useEffect(() => {
    if (location.pathname === '/naturespots') {
      setActive('naturespots');
      setSelectedIndex(0);
    }
    if (location.pathname.includes('/mypage')) {
      setActive('mypage');
      setSelectedIndex(1);
    }
    if (location.pathname.includes('/savedtomatch')) {
      setActive('savedtomatch');
      setSelectedIndex(2);
    }

    const token = window.localStorage.getItem('token');
    const getUserInfo = async () => {
      console.log(isUserThere);
      if (token !== null) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const res = await axios.get('/users/profile', config);
        setUserInfo(res.data);
        await setFavIdArr(res.data.favoritePics);
        await setSavIdArr(res.data.savedPics);
        setIsUserThere(true);
      }
    };

    getUserInfo();
  }, [fetch]);

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        m={2}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box mr={2}>
          {isUserThere ? (
            <img
              alt={userInfo.avatarUrl}
              className={classes.logo}
              src={userInfo.avatarUrl}
            />
          ) : (
            <img alt="logo" className={classes.logo} src={AppLogo} />
          )}
        </Box>
        {isUserThere ? (
          <Typography style={{ color: teal[800] }}>
            Hello {userInfo.username}
          </Typography>
        ) : (
          <Typography style={{ color: teal[800] }}>Hello👋</Typography>
        )}
      </Box>
      <Divider />
      <List>
        <Link style={{ textDecoration: 'none' }} to="/naturespots">
          <ListItem button key="Nature Spots" selected={selectedIndex === 0}>
            <Box mr={1}>
              <ExploreIcon color="primary" />
            </Box>
            <ListItemText
              primary={
                <Typography type="body2" style={{ color: '#008080' }}>
                  Nature Spots
                </Typography>
              }
            />
          </ListItem>
        </Link>
        {isUserThere && (
          <React.Fragment>
            {' '}
            <Link
              style={{ textDecoration: 'none' }}
              to={`/mypage/${userInfo._id}`}
            >
              <ListItem button key="My Page" selected={selectedIndex === 1}>
                <Box mr={1}>
                  <LoyaltyIcon color="primary" />
                </Box>
                <ListItemText
                  primary={
                    <Typography type="body2" style={{ color: '#008080' }}>
                      My Page
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
            <Link
              style={{ textDecoration: 'none' }}
              to={`/savedtomatch/${userInfo._id}`}
            >
              <ListItem
                button
                key="Saved to Match"
                selected={selectedIndex === 2}
              >
                <Box mr={1}>
                  <BookmarksIcon color="primary" />
                </Box>
                <ListItemText
                  primary={
                    <Typography type="body2" style={{ color: '#008080' }}>
                      Saved to Match
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          </React.Fragment>
        )}
        {isUserThere ? (
          <ListItem onClick={handleLogout}>
            <ListItemText
              primary={
                <Typography type="body2" style={{ color: '#008080' }}>
                  Logout
                </Typography>
              }
            />
          </ListItem>
        ) : (
          <Link style={{ textDecoration: 'none' }} to="/login">
            <ListItem>
              {' '}
              <ListItemText
                primary={
                  <Typography type="body2" style={{ color: '#008080' }}>
                    Login
                  </Typography>
                }
              />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon style={{ color: green[900] }} />
            </IconButton>
            <Drawer
              anchor="left"
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
            <Box>
              {active === 'naturespots' && (
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ color: teal[900] }}
                >
                  Nature Spots
                </Typography>
              )}
              {active === 'mypage' && (
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ color: teal[900] }}
                >
                  My Page
                </Typography>
              )}
              {active === 'savedtomatch' && (
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ color: teal[900] }}
                >
                  Saved Pics
                </Typography>
              )}
            </Box>

            {/* {userInfo ? (
              <Button size="small">
                <Typography variant="h6" color="inherit">
                  Logout
                </Typography>
              </Button>
            ) : (
              <Link style={{ textDecoration: 'none' }} to="/login">
                <Typography variant="h6" color="inherit">
                  Login
                </Typography>
              </Link>
            )} */}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
