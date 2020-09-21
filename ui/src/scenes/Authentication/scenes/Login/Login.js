import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Cookie from "js-cookie";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setToken, setError } from "../../slice";
import { getError } from "../../selectors";

const useStyles = makeStyles({
  button: {
    color: "white",
    padding: "5px 30px",
    "margin-bottom": "0.5rem",
  },
  input: {
    "margin-bottom": "1rem",
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector(getError);
  return (
    <>
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("/api/user/login", {
              ...values,
            })
            .then((response) => {
              dispatch(setUserInfo(response.data.userInfo));
              dispatch(setToken(response.data.authToken));
              dispatch(setError(null));
              Cookie.set("auth-token", response.data.authToken);
              history.push("/main");
            })
            .catch((error) => dispatch(setError(error.response.data.message)));
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form>
            <div className="login-form-container">
              <TextField
                className={classes.input}
                label="Email"
                name="email"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                className={classes.input}
                label="Password"
                name="password"
                // type="password"
                variant="outlined"
                onChange={handleChange}
              />
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
                onClick={() => history.push("/auth/register")}
              >
                Sign Up
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
