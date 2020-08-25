import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Authentication from "./scenes/Authentication/Authentication";
import Main from "./scenes/Main";
import { verifyAuthCookie } from "./utils/authUtils";
import axios from "axios";
import Cookie from "js-cookie";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "./scenes/Authentication/slice";

const App = () => {
  const dispatch = useDispatch();
  const token = Cookie.get("auth-token");
  const fetchAuth = async () => {
    await axios
      .post("/api/user/authenticate", {
        token,
      })
      .then(() => dispatch(setAuthenticated(true)));
  };

  useEffect(() => {
    if (token) {
      // fetchAuth();
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/auth" render={() => <Authentication />} />
        <Route
          path="/main"
          render={() => (false ? <Main /> : <Redirect to="/auth" />)}
        />
        <Route path="/" render={() => <Redirect to="/auth" />} />
      </Switch>
    </div>
  );
};

export default App;
