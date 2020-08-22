import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Login from "./scenes/Login";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route exact path="/test" render={() => <div>Test test</div>} />
      </Switch>
    </div>
  );
}

export default App;
