import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Lobby from './pages/Lobby';
import Home from './pages/Home';
import Dealer from './pages/Dealer';

// TODO: Implement Google analysis
// ReactGA.pageview('/homepage')

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/lobby' exact>
          <Lobby />
        </Route>
        <Route path='/home' exact>
          <Home />
        </Route>
        <Route path='/dealer' exact>
          <Dealer />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
