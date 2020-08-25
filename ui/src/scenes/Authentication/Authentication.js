import React, { useEffect } from "react";
import Cookie from "js-cookie";
import "./styles.scss";
import Login from "./scenes/Login";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Register from "./scenes/Register";
import { verifyAuthCookie } from "../../utils/authUtils";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "./slice";

const Authentication = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { path } = useRouteMatch();
  const token = Cookie.get("auth-token");

  const fetchAuth = async () => {
    const test = dispatch(setAuthenticated(true));
    await axios
      .post("/api/user/authenticate", {
        token,
      })
      .then(() => {
        test();
        history.push("/main");
      });
  };

  useEffect(() => {
    if (token) {
      fetchAuth();
    }
  }, []);
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
