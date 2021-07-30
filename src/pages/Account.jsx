import { makeStyles, Grid, Typography } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  
}));

function Account() {
  const classes = useStyles();
    
  return ( 
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h1">Account Page</Typography>
        </Grid>
      </Grid>
    </div>
  );
};
 
export default Account;