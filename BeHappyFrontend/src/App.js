import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ScreenWelcome from "./ScreenWelcome";
import ScreenRandom from "./ScreenRandom";
import ScreenProfile from "./ScreenProfile";
import ScreenUser from "./ScreenUser";
import ScreenSearchReco from "./ScreenSearchReco";
import ScreenSearchUser from "./ScreenSearchUser";
import ScreenSignInUp from "./ScreenSignInUp";

import token from "./reducers/token";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
const store = createStore(combineReducers({ token }));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenWelcome} />
          <Route exact path="/screensigninup" component={ScreenSignInUp} />
          <Route exact path="/screenrandom" component={ScreenRandom} />
          <Route exact path="/screenprofile" component={ScreenProfile} />
          <Route exact path="/screenuser" component={ScreenUser} />
          <Route exact path="/screensearchreco" component={ScreenSearchReco} />
          <Route exact path="/screensearchuser" component={ScreenSearchUser} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
