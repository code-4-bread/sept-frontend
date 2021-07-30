import { Button, Grid, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 10
  },
  button: {
    background: '#00395b',
  },
  register: {
    marginLeft: 7,
    //background: '#227e88',
  },
  media: {
    height: 140,
  },
  card: {
    width: 345, 
  },
  aboutMe: {
    width: 600
  }
}));

function Profile() {
  const classes = useStyles();
    
  return ( 
    <div className={classes.root}>
      <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={4}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
            User 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
            Student/Lecturer
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card className={classes.aboutMe}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
               About Me
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              Blah Blah Blah
              </Typography>   
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card className={classes.aboutMe}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
               Certifications
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              Blah Blah Blah
              </Typography>   
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card className={classes.aboutMe}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
               Previous Experience (Lecturers Only)
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              Blah Blah Blah
              </Typography>   
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card className={classes.aboutMe}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
               Contact Details
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
              HP: +65 XXXX XXXX 
                <br />
              Email: john.smith@skillswap.com
              </Typography>   
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
 
export default Profile;