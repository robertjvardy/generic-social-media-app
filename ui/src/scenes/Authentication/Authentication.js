import React from "react";
import "./styles.scss";
import Login from "./scenes/Login";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Register from "./scenes/Register";

const Authentication = () => {
  let { path } = useRouteMatch();

  return (
    <div className="auth-form-container">
      <Switch>
        <Route exact path={`${path}/login`} render={() => <Login />} />
        <Route exact path={`${path}/register`} render={() => <Register />} />
        <Route path={`${path}/`} render={() => <Redirect to="/auth/login" />} />
      </Switch>
    </div>
  );
};

export default Authentication;
