import {Button, Card, CardActions, CardContent, Chip, Grid, Typography} from '@material-ui/core';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }
  
  async componentDidMount() {
    const data = await axios.get('http://localhost:8080/course/findAll');
    this.setState({courses: data.data.courses});
  }
  
  
  render() {
    const listOfCourses = this.state.courses.map((each) => (
      <Grid key={each.id} item>
        <Card style={{width: '500px'}}>
          <CardContent>
            <h2>{each.title}</h2>
            <p>{each.about}</p>
            <Chip label={each.type} color='primary' />
          </CardContent>
          <CardActions>
            <Button color='primary' size='small'>Enroll</Button>
          </CardActions>
        </Card>
      </Grid>
    ));
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h3">Course Listing</Typography>
        </Grid>
        <Grid item>
          <Link
            to='/course'
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant='outlined'
              color='primary'
            >
              Create new course
            </Button>
          </Link>
        </Grid>
        {listOfCourses}
      </Grid>
    );
  }
}
 
export default Listings;
