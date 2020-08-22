import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.css";
import { useHistory } from "react-router-dom";

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
  return (
    <>
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("http://localhost:5000/api/user/login", {
              ...values,
            })
            .then((response) => console.log(response.data));
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
                onClick={() => history.push("/register")}
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
