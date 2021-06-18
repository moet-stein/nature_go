import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  //   list: {
  //     width: 250,
  //   },
  fullList: {
    width: 'auto',
  },
}));

export default function AppBarComponent() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
      <Box m={2} display="flex" justifyContent="center" alignItems="center">
        <Typography>Hello User</Typography>
      </Box>
      <Divider />
      <List>
        <Link style={{ textDecoration: 'none' }} to="/naturespots">
          <ListItem button key="Nature Spots">
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
        <Link style={{ textDecoration: 'none' }} to="/mypage/userid123">
          <ListItem button key="My Page">
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
        <Link style={{ textDecoration: 'none' }} to="/savedtomatch/userid123">
          <ListItem button key="Saved to Match">
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
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
            <Typography variant="h6" className={classes.title}>
              Nature Go
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
