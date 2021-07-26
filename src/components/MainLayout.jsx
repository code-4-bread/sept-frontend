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
import { Button, Divider, List, ListItem } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';

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
    background: '#00395b'
  },
  loginButton: {
    background: '#ffffff',
    marginRight: 10,
  },
}));

function MainLayout ({ children }){
  
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  /*
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
*/
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

  const menuItems = () => (
    <List>
      <ListItem button>Categories</ListItem>
      <ListItem button>High Demand</ListItem>
      <ListItem button>Recommended</ListItem>
      <ListItem button>Singapore</ListItem>
      <Divider />
      <ListItem button>Become a Tutor</ListItem>
      <ListItem button>6</ListItem>
      <ListItem button>7</ListItem>
      <ListItem button>8</ListItem>
    </List>
  );

  return (

    <div className={classes.root}>
     
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <SwapHorizontalCircleIcon />
            Skill Swap
          </Typography>
          <Button className={classes.loginButton} variant="contained">Login</Button>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      
      <div>
        <Drawer anchor={'left'} open={state} onClose={toggleDrawer(false)}>
          {menuItems()}
        </Drawer>
      </div>

      <div className={classes.page}>
        <div className={classes.toolbar}>
        </div>
        {children}
      </div> 
    </div>
  );
}

export default MainLayout;