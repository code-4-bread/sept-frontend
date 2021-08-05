import React, {Component} from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel, MenuItem, Select,
  Snackbar,
  TextField
} from '@material-ui/core';
import {courseTypes} from '../courseTypes';
import axios from 'axios';
import {CURRENT_USER_ID} from '../constants';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      type: '',
      about: '',
      courseCreated: false,
    };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnCreate = this.handleOnCreate.bind(this);
  }
  
  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  async handleOnCreate(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/course/create', {
        title: this.state.title,
        type: this.state.type,
        about: this.state.about,
        created_by: localStorage.getItem(CURRENT_USER_ID),
      });
      this.setState({
        title: '', type: '', about: '', courseCreated: true
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }
  
  render () {
    return (
      <div style={{ flexGrow: 1, marginTop: 100 }}>
        <Snackbar
          open={this.state.courseCreated}
          message="Course created"
        
        />
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
        
        >
          <Grid item>
            <h1>Create A New Course</h1>
          </Grid>
        </Grid>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          spacing={4}
        >
          <Grid item>
            <TextField
              label='Course title'
              name='title'
              type='text'
              variant='outlined'
              onChange={this.handleOnChange}
              value={this.state.title}
            />
            <FormControl variant='outlined' style={{marginLeft: '20px', width: '200px'}}>
              <InputLabel>Type</InputLabel>
              <Select
                value={this.state.type}
                name='type'
                onChange={this.handleOnChange}
                label='Type'
              >
                {courseTypes.map((each) => (<MenuItem value={each}>{each}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <TextField
              label='About the course'
              name='about'
              variant='outlined'
              multiline
              rows={4}
              onChange={this.handleOnChange}
              value={this.state.about}
              style={{width: '420px'}}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              style={{ background: '#00395b' }}
              onClick={this.handleOnCreate}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Course;
