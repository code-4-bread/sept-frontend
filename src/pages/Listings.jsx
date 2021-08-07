import {Button, Card, CardActions, CardContent, Chip, Grid, Typography} from '@material-ui/core';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {CURRENT_USER_TYPE, INSTRUCTOR_USER_TYPE, LEARNER_USER_TYPE} from '../constants';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      users: {},
    };
  }
  
  async componentDidMount() {
    const data = await axios.get('http://localhost:8080/course/findAll');
    const userData = await axios.get('http://localhost:8080/users/findAll');
    const userMap = {};
  
    userData.data.users.map((each) => userMap[each._id] = each.display_name);
    this.setState({courses: data.data.courses, users: userMap});
  }
  
  
  render() {
    const listOfCourses = this.state.courses.map((each) => (
      <Grid key={each.id} item>
        <Card style={{width: '500px'}}>
          <CardContent>
            <h2>{each.title}</h2>
            <p>{each.about}</p>
            <Chip label={each.type} color='primary' />
            <Typography variant='caption' component='h2' style={{marginTop: '30px'}}>
              By <b style={{fontSize: '14px'}}>{this.state.users[each.created_by]}</b>
            </Typography>
          </CardContent>
          {
            localStorage.getItem(CURRENT_USER_TYPE) === LEARNER_USER_TYPE ?
              <CardActions>
                <Button color='primary' size='small'>Enroll</Button>
              </CardActions>
              : <></>
          }
        </Card>
      </Grid>
    ));
    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h3">Course Listing</Typography>
        </Grid>
        {
          localStorage.getItem(CURRENT_USER_TYPE) === INSTRUCTOR_USER_TYPE ?
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
            : <></>
        }
        {listOfCourses}
      </Grid>
    );
  }
}
 
export default Listings;
