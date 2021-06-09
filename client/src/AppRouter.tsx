import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LobbyHome from "./pages/LobbyHome";
import Lobby from "./pages/Lobby";
import Dealer from "./pages/Dealer";
import useSocket from "./hooks/socket";

// TODO: Implement Google analysis
// ReactGA.pageview('/homepage')

const AppRouter = () => {
  useSocket({ userId: 1 });
  return (
    <Router>
      <Switch>
        <Route path="/lobby" exact>
          <Lobby></Lobby>
        </Route>
        <Route path="/" exact>
          <LobbyHome></LobbyHome>
        </Route>
        <Route path="/dealer" exact>
          <Dealer></Dealer>
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
