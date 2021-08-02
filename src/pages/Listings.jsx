import { makeStyles, Grid, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  
}));

function Listings() {
  const classes = useStyles();
    
  return ( 
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h1">Listings Page</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
 
export default Listings;