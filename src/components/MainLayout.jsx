import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import { useHistory, useLocation } from 'react-router';
import { isAuthenticated } from '../services/AuthService';
import { TUTOR_AUTH_TOKEN } from '../constants';
//=======custom CSS==========//
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
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  bar: {
    background: '#00395b',
  },
  loginButton: {
    background: '#ffffff',
    marginRight: 10,
  },
  active: {
    background: '#d6e6f6',
  },
}));
//=======Main========//
function MainLayout({ children }) {
  const classes = useStyles();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const location = useLocation();

  const history = useHistory();
  const routeChange = () => {
    history.push('/');
  };

  const routeProfile = () => {
    history.push('/profile');
    handleClose();
  };

  const routeAccount = () => {
    history.push('/account');
    handleClose();
  };
  //======Menu Items======//
  const menuItems = [
    {
      text: 'Home',
      path: '/',
    },
    {
      text: 'Account',
      path: '/account',
    },
  ];

  if (!isAuthenticated) {
    menuItems.push({
      text: 'Login',
      path: '/login',
    });
  }

  const loginButton = !isAuthenticated ? (
    <Button
      className={classes.loginButton}
      variant='contained'
      onClick={routeChange}
    >
      Login
    </Button>
  ) : (
    <></>
  );

  //======Components======//
  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.bar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <SwapHorizontalCircleIcon />
            Skill Swap
          </Typography>
          {loginButton}
          {auth && (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle fontSize='large' />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={routeProfile}>Profile</MenuItem>
                <MenuItem onClick={routeAccount}>My Account</MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.setItem(TUTOR_AUTH_TOKEN, '');
                    window.location.reload();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {/** Maps menu items into the side menu dynamically */}
      <div>
        <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
