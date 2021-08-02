import React, { Component } from 'react';
import { Button, } from '@material-ui/core';
import axios from 'axios';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
    
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  async handleOnClick() {
    try {
      const result = await axios.get('http://localhost:8080/');
      this.setState(() => ({result: result.data}));
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return <div>
      <Button variant='contained' color='primary' onClick={this.handleOnClick}>Call API</Button>
      <h3>API Result - {this.state.result}</h3>
      {/**<BottomBar></BottomBar> */} 
    </div>;
  }
}

export default Main;
