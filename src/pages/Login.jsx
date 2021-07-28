import { Button, Grid, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 100
  },
  button: {
    background: '#00395b',
  },
  register: {
    marginLeft: 7,
    //background: '#227e88',
  }
}));

function Login() {
  const classes = useStyles();
    
  return ( 
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <TextField label="Username" variant="outlined" />
        </Grid>
        <Grid item>
          <TextField label="Password" variant="outlined" />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.button}>Login</Button>
          <Button variant="outlined" color="primary" className={classes.register}>Register</Button>
        </Grid>
      </Grid>
    </div>
  );
};
 
export default Login;