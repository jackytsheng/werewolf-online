import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LobbyHome from "./pages/LobbyHome";
import Lobby from "./pages/Lobby";
import Dealer from "./pages/Dealer";
import { Message } from "./components/ChatBubble";

// TODO: Implement Google analysis
// ReactGA.pageview('/homepage')

const fakeMessages: Message[] = [
  {
    time: "8:03 pm",
    speaker: "Sponge Bob",
    text: "Welcome to Werewolf Lobby",
  },
  {
    time: "8:02 pm",
    speaker: "Jacky",
    text: "Hello World",
  },
];

const AppRouter = () => {
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
