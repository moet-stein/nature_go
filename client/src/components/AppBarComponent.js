import React, { useEffect, useState, useContext } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

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
  const { userInfo } = useContext(AuthContext);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
        flex-flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box mr={2}>
          {userInfo ? (
            <img className={classes.logo} src={userInfo.avatarUrl} />
          ) : (
            <img className={classes.logo} src={AppLogo} />
          )}
        </Box>
        {userInfo ? (
          <Typography>Hello {userInfo.username}</Typography>
        ) : (
          <Typography>Hello👋</Typography>
        )}
      </Box>
      <Divider />
      <List>
        <Link style={{ textDecoration: 'none' }} to="/naturespots">
          <ListItem
            button
            key="Nature Spots"
            className={active === 'naturespots' && classes.activeBg}
          >
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
        {userInfo && (
          <React.Fragment>
            {' '}
            <Link
              style={{ textDecoration: 'none' }}
              to={`/mypage/${userInfo._id}`}
            >
              <ListItem
                button
                key="My Page"
                className={active === 'mypage' && classes.activeBg}
              >
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
                className={active === 'savedtomatch' && classes.activeBg}
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
        {userInfo ? (
          <ListItem>
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

  useEffect(() => {
    if (location.pathname === '/naturespots') setActive('naturespots');
    if (location.pathname.includes('/mypage')) setActive('mypage');
    if (location.pathname.includes('/savedtomatch')) setActive('savedtomatch');

    // const token = window.localStorage.getItem('token');
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` },
    // };
    // const res = await axios.get('/users/profile', config);
    // console.log(res.data);
  }, []);

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
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>

            {active === 'naturespots' && (
              <Typography variant="h6" className={classes.title}>
                Nature Spots
              </Typography>
            )}
            {active === 'mypage' && (
              <Typography variant="h6" className={classes.title}>
                My Page
              </Typography>
            )}
            {active === 'savedtomatch' && (
              <Typography variant="h6" className={classes.title}>
                Saved Pics
              </Typography>
            )}

            {userInfo ? (
              <Typography variant="h6" color="inherit">
                Logout
              </Typography>
            ) : (
              <Link style={{ textDecoration: 'none' }} to="/login">
                <Typography variant="h6" color="inherit">
                  Login
                </Typography>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
