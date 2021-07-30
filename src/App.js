import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import MainLayout from './components/MainLayout';
import Main from './pages/Main';
import Account from './pages/Account';
import Browse from './pages/Browse';
import Listings from './pages/Listings';

// routes all the pages into the main app
function App() {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="/Main">
            <Main />
          </Route>
          <Route path="/Account">
            <Account />
          </Route>
          <Route path="/Browse">
            <Browse />
          </Route>
          <Route path="/Listings">
            <Listings />
          </Route>
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;