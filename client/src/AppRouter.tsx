import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LobbyHome from "./pages/LobbyHome";
import Lobby from "./pages/Lobby";
import Dealer from "./pages/Dealer";
import useSocket from "./hooks/socket";

// TODO: Implement Google analysis
// ReactGA.pageview('/homepage')

const AppRouter = () => {
  // Trigger chagnes to enable socket
  const [userId, setUserId] = useState(1);
  const { join } = useSocket({ userId });

  return (
    <Router>
      <Switch>
        <Route path="/lobby" exact>
          <Lobby />
        </Route>
        <Route path="/" exact>
          <LobbyHome />
        </Route>
        <Route path="/dealer" exact>
          <Dealer />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
