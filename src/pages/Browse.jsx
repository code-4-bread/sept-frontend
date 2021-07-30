import { makeStyles, Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  
}));

function Browse() {
  const classes = useStyles();

  const history = useHistory();
  const routeListing = () => {
    history.push('/Listings');
  };
    
  return ( 
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h1">Browse Page</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={routeListing}>Listings</Button>
        </Grid>
      </Grid>
    </div>
  );
};
 
export default Browse;