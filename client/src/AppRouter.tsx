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
import { Path } from './utils/url';

// TODO: Implement Google analysis
// ReactGA.pageview('/homepage')

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={Path.Root} exact>
          <Redirect to={Path.Home} />
        </Route>
        <Route path={Path.Lobby} exact>
          <Lobby />
        </Route>
        <Route path={Path.Home} exact>
          <Home />
        </Route>
        <Route path={Path.Dealer} exact>
          <Dealer />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
