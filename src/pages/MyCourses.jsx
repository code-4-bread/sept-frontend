import React, {Component} from 'react';
import {Button, Card, CardActions, CardContent, Chip, Grid, Typography} from '@material-ui/core';
import {CURRENT_USER_ID, CURRENT_USER_TYPE, INSTRUCTOR_USER_TYPE} from '../constants';
import axios from 'axios';
import {Link} from 'react-router-dom';

class MyCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      users: {},
    };
  }
  
  
  async componentDidMount() {
    const userData = await axios.get('http://localhost:8080/users/findAll');
    const userMap = {};
    const userFilterOptions = [];
    
    let myCourses;
    const data = await axios.get('http://localhost:8080/course/findAll');
    if (localStorage.getItem(CURRENT_USER_TYPE) === INSTRUCTOR_USER_TYPE) {
      myCourses = data.data.courses.filter((each) => each.created_by === localStorage.getItem(CURRENT_USER_ID));
    } else {
      const userCoursesData = await axios.post('http://localhost:8080/courses-to-user/findByUserId', {
        user_id: localStorage.getItem(CURRENT_USER_ID)
      });
      const userCoursesId = userCoursesData.data.courses.map((each) => each.course_id);
      myCourses = data.data.courses.filter((each) => userCoursesId.includes(each._id));
    }
    
    userData.data.users.forEach((each) => {
      userMap[each._id] = each.display_name;
      if (each.type === INSTRUCTOR_USER_TYPE) {
        userFilterOptions.push({
          id: each._id,
          name: each.display_name,
        });
      }
    });
    this.setState({courses: myCourses, users: userMap, userFilterOptions});
  }
  
  async handleOnDelete(event, courseId) {
    event.preventDefault();
    
    if(confirm('Are you sure you want to delete this course?')) {
      await axios.post('http://localhost:8080/course/delete', {id: courseId});
      window.location.reload();
    }
  }
  
  
  render() {
    const listOfCourses = this.state.courses.map((each) => (
      <Grid key={each._id} item>
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
            localStorage.getItem(CURRENT_USER_TYPE) === INSTRUCTOR_USER_TYPE ?
              <CardActions>
                <Button color='primary' variant='contained' size='small' onClick={(e) => this.handleOnDelete(e, each._id)}>Delete</Button>
              </CardActions>
              : <></>
          }
        </Card>
      </Grid>
    ));

    return (
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Grid item>
          <Typography variant="h3">My Courses</Typography>
        </Grid>
        <Grid item>
          <Link
            to='/'
            style={{textDecoration: 'none'}}
          >
            <Button
              variant='text'
              color='primary'
              style={{ marginLeft: 7 }}
            >
              Back to main listing
            </Button>
          </Link>
        </Grid>
        {listOfCourses.length === 0 ?
          <Typography variant='overline' style={{marginTop: '100px', fontSize: '20px'}}>
            You have not created any courses.
          </Typography>
          : listOfCourses
        }
      </Grid>
    );
  }
}

export default MyCourses;
