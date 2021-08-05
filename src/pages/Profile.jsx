import {Button, Grid, TextField, Typography} from '@material-ui/core';
import React, {Component} from 'react';
import {CURRENT_USER_EMAIL} from '../constants';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '',email: '', displayName: '', about: '', isEdit: false};
    
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSave = this.handleOnSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  
  async componentDidMount() {
    const data = await axios.post('http://localhost:8080/users/find', {email: localStorage.getItem(CURRENT_USER_EMAIL)});
    const {
      display_name: displayName,
      email,
      about,
      _id: id,
    } = data.data.user;
    
    
    this.setState({
      displayName,
      id,
      email,
      about
    });
  }
  
  async handleCancel() {
    const data = await axios.post('http://localhost:8080/users/find', {email: localStorage.getItem(CURRENT_USER_EMAIL)});
    const {
      display_name: displayName,
      email,
      about,
      _id: id,
    } = data.data.user;
  
  
    this.setState({
      displayName,
      id,
      email,
      about,
      isEdit: false
    });
  }
  
  handleOnChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  async handleOnSave() {
    const data = await axios.post('http://localhost:8080/users/update', {
      id: this.state.id,
      email: this.state.email,
      display_name: this.state.displayName,
      about: this.state.about,
    });
  
    const {
      display_name: displayName,
      email,
      about,
    } = data.data.user;
    localStorage.setItem(CURRENT_USER_EMAIL, email);
    this.setState({
      displayName,
      email,
      about,
      isEdit: false
    });
  }
  
  render() {
    return (
      <div style={{flexGrow: 1, marginTop: 10}}>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4}>
          <Grid item>
            <Typography variant="h3">My Profile</Typography>
          </Grid>
          <Grid item>
            <TextField
              disabled={!this.state.isEdit}
              label='Display name'
              name='displayName'
              type='text'
              variant='outlined'
              value={this.state.displayName}
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item>
            <TextField
              disabled={!this.state.isEdit}
              label='Email'
              name='email'
              type='text'
              variant='outlined'
              value={this.state.email}
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item>
            <TextField
              disabled={!this.state.isEdit}
              multiline
              rows={4}
              label='About'
              name='about'
              type='text'
              variant='outlined'
              value={this.state.about}
              onChange={this.handleOnChange}
            />
          </Grid>
          <Grid item>
            {this.state.isEdit ?
              (
                <>
                  <Button variant="contained" color="primary" onClick={this.handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleOnSave}>
                    Save
                  </Button>
                </>
              )
              :
              <Button variant="contained" color="primary" onClick={() => this.setState({isEdit: !this.state.isEdit})}>
                Edit
              </Button>
            }
          </Grid>
        </Grid>
      </div>
    );
  }
}
 
export default Profile;
