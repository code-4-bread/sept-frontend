import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Route path="/about">
          <Main />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
