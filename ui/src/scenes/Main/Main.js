import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Cookie from "js-cookie";
import { getUser } from "../Authentication/selectors";
import { useHistory } from "react-router-dom";
import { logOutUser, setUserInfo, setToken } from "../Authentication/slice";
import axios from "axios";
import Feed from "./scenes/Feed/Feed";
import "./styles.scss";
import Layout from "./scenes/Layout/Layout";

const Main = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { firstName, lastName, email, posts, friends } = useSelector(getUser);
  const token = Cookie.get("auth-token");

  const handleLogOut = () => {
    Cookie.remove("auth-token");
    history.push("/auth/login");
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (token) {
      axios
        .post("/api/user/authenticate", {
          token,
        })
        .then((response) => {
          dispatch(setUserInfo(response.data.user));
          dispatch(setToken(response.data.token));
        })
        .catch(() => history.push("/auth/login"));
    } else {
      history.push("/auth/login");
    }
  }, []);

  // TODO create a wrapper component to take care of the layout and replace outer div

  return (
    <Layout>
      <div className="main">
        {/* TODO add a router here for the main content of the site */}
        {/* TODO make main a container component for the layout of the main site */}
        <Feed />
        <div>Logged In!!!!</div>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleLogOut()}
        >
          Log Out
        </Button>
      </div>
    </Layout>
  );
};

export default Main;
