import React, {Component} from 'react';
import axios from 'axios';
import {Button, Checkbox, FormControlLabel, Grid, Snackbar, TextField} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {INSTRUCTOR_USER_TYPE, LEARNER_USER_TYPE} from '../constants';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', displayName: '', type: '1', about: '', userCreated: false };
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnRegister = this.handleOnRegister.bind(this);
  }
  
  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  async handleOnRegister(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/users/create', {
        email: this.state.email,
        password: this.state.password,
        display_name: this.state.displayName,
        type: this.state.type,
      });
      this.setState({
        email: '', password: '', displayName: '', type: '1', userCreated: true
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
          open={this.state.userCreated}
          message="User created"
          
        />
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
          
        >
          <Grid item>
            <h1>Register</h1>
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
              label='Display name'
              name='displayName'
              type='text'
              variant='outlined'
              onChange={this.handleOnChange}
              value={this.state.displayName}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Email'
              name='email'
              type='email'
              variant='outlined'
              onChange={this.handleOnChange}
              value={this.state.email}
            />
          </Grid>
          <Grid item>
            <TextField
              label='Password'
              name='password'
              variant='outlined'
              type='password'
              onChange={this.handleOnChange}
              value={this.state.password}
            />
          </Grid>
          <Grid item>
            <TextField
              label='About me'
              name='about'
              variant='outlined'
              multiline
              rows={4}
              onChange={this.handleOnChange}
              value={this.state.about}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={this.state.type === INSTRUCTOR_USER_TYPE} onChange={this.handleOnChange} name="type" />}
              label='Instructor'
              value={1}
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.type === LEARNER_USER_TYPE} onChange={this.handleOnChange} name="type" />}
              label='Learner'
              value={2}
            />
          </Grid>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              style={{ background: '#00395b' }}
              onClick={this.handleOnRegister}
            >
              Register
            </Button>
            <Link
              to='/login'
            >
              <Button
                variant='outlined'
                color='primary'
                style={{ marginLeft: 7 }}
              >
                Login
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Register;
