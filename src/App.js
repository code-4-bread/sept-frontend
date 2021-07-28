import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import MainLayout from './components/MainLayout';

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
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;