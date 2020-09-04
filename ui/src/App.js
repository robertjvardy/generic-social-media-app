import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Authentication from "./scenes/Authentication/Authentication";
import Main from "./scenes/Main";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/auth" render={() => <Authentication />} />
        <Route path="/main" render={() => <Main />} />
        <Route path="/" render={() => <Redirect to="/auth" />} />
      </Switch>
    </div>
  );
};

export default App;
