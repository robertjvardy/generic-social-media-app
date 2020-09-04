import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Cookie from "js-cookie";
import { getUser } from "../Authentication/selectors";
import { useHistory } from "react-router-dom";
import { logOutUser, setUserInfo, setToken } from "../Authentication/slice";
import axios from "axios";

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

  return (
    <>
      <h3>{firstName}</h3>
      <h3>{lastName}</h3>
      <h3>{email}</h3>
      <h3>{posts}</h3>
      <h3>{friends}</h3>
      <div>Logged In!!!!</div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleLogOut()}
      >
        Log Out
      </Button>
    </>
  );
};

export default Main;
