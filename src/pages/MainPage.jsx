import { Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'auto'
  },
  searchBar: {
    marginTop: 20,
  },
  button: {
    background: '#00395b',
  },
  api: {
    marginTop: 50
  }
}));

function MainPage() {
  const classes = useStyles();

  return ( 
    <div className={classes.root}> 
      <Grid container spacing={1} direction="row" justifyContent="center" alignContent="center" alignItems="center" className={classes.searchBar}>
        <Grid item>
          <TextField label="Category" variant="outlined" />
        </Grid>
        <Grid item>
          <TextField label="Location" variant="outlined" />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" className={classes.button}>Search</Button>
        </Grid>
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center" className={classes.api}>
        <Grid item>
        
        </Grid>
      </Grid>
      <Grid container>

      </Grid>
    </div>
  );
};
 
export default MainPage;