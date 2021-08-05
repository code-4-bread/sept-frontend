import { Button, Grid, TextField } from '@material-ui/core';
import {CURRENT_USER_EMAIL, CURRENT_USER_ID, TUTOR_AUTH_TOKEN} from '../constants';
import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnLogin = this.handleOnLogin.bind(this);
  }

  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleOnLogin(event) {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:8080/auth/login', {
        email: this.state.email,
        password: this.state.password,
      });
      console.log(result.data);
      localStorage.setItem(
        TUTOR_AUTH_TOKEN,
        result.data.data.accessToken
      );
      localStorage.setItem(
        CURRENT_USER_ID,
        result.data.data.user.id
      );
      localStorage.setItem(
        CURRENT_USER_EMAIL,
        result.data.data.user.email
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div style={{ flexGrow: 1, marginTop: 100 }}>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
  
        >
          <Grid item>
            <h1>Login</h1>
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
            <Button
              variant='contained'
              color='primary'
              style={{ background: '#00395b' }}
              onClick={this.handleOnLogin}
            >
              Login
            </Button>
            <Link
              to='/register'
            >
              <Button
                variant='outlined'
                color='primary'
                style={{ marginLeft: 7 }}
              >
                Register
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
