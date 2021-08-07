import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel, MenuItem, Select,
  Typography
} from '@material-ui/core';
import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {CURRENT_USER_TYPE, INSTRUCTOR_USER_TYPE, LEARNER_USER_TYPE} from '../constants';
import {courseTypes} from '../courseTypes';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      users: {},
      userFilterOptions: [],
      typeFilter: '',
      userFilter: '',
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  
  async componentDidMount() {
    const data = await axios.get('http://localhost:8080/course/findAll');
    const userData = await axios.get('http://localhost:8080/users/findAll');
    const userMap = {};
    const userFilterOptions = [];
  
    userData.data.users.forEach((each) => {
      userMap[each._id] = each.display_name;
      userFilterOptions.push({
        id: each._id,
        name: each.display_name,
      });
    });
    this.setState({courses: data.data.courses, users: userMap, userFilterOptions});
  }
  
  async handleOnChange(event) {
    event.preventDefault();
    
    let newCourses;
    if (event.target.name === 'typeFilter' && event.target.value !== '') {
      newCourses = this.state.courses.filter((each) => each.type === event.target.value);
    } else if (event.target.name === 'userFilter' && event.target.value !== '') {
      newCourses = this.state.courses.filter((each) => each.created_by === event.target.value);
    } else {
      const data = await axios.get('http://localhost:8080/course/findAll');
      
      newCourses = data.data.courses;
    }
    this.setState({
      [event.target.name]: event.target.value,
      courses: newCourses
    });
  }
  
  
  render() {
    const listOfCourses = this.state.courses.map((each) => (
      <Grid key={each.id} item>
        <Card style={{width: '500px'}}>
          <CardContent>
            <h2>{each.title}</h2>
            <p>{each.about}</p>
            <Chip label={each.type} onClick={() => this.setState({typeFilter: each.type})} color='primary' />
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
    
    const courseTypeFilterItems = courseTypes.map((each) => (
      <MenuItem value={each}>{each}</MenuItem>
    ));
  
    const userFilterItems = this.state.userFilterOptions.map((each) => (
      <MenuItem value={each.id}>{each.name}</MenuItem>
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
        <hr/>
        <FormControl style={{width: '150px'}}>
          <InputLabel>Class Type Filter</InputLabel>
          <Select
            value={this.state.typeFilter}
            name='typeFilter'
            onChange={this.handleOnChange}
          >
            <MenuItem value=''>-</MenuItem>
            {courseTypeFilterItems}
          </Select>
        </FormControl>
        <FormControl style={{width: '150px'}}>
          <InputLabel>Instructor Filter</InputLabel>
          <Select
            value={this.state.userFilter}
            name='userFilter'
            onChange={this.handleOnChange}
          >
            <MenuItem value=''>-</MenuItem>
            {userFilterItems}
          </Select>
        </FormControl>
        {listOfCourses.length === 0 ?
          <Typography variant='overline' style={{marginTop: '100px', fontSize: '20px'}}>
            There are no courses to display
          </Typography>
          : listOfCourses
        }
      </Grid>
    );
  }
}
 
export default Listings;
