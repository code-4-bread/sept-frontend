import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isAuthenticated } from './services/AuthService';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import Listings from './pages/Listings';

// routes all the pages into the main app
function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/">
            {isAuthenticated ? <Listings /> : <Login />}
          </Route>
          <Route exact path="/login">
            {isAuthenticated ? <Listings /> : <Login />}
          </Route>
          <Route exact path="/profile">
            {isAuthenticated ? <Profile /> : <Login />}
          </Route>
          <Route exact path="/account">
            {isAuthenticated ? <Account /> : <Login />}
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;