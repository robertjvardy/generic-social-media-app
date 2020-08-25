import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRegistered, setUserInfo, setError } from "../../slice";

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

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <h2>Sign Up!</h2>
      {/* TODO add validations */}
      <Formik
        initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post("/api/user/register", {
              ...values,
            })
            .then((response) => {
              dispatch(setRegistered());
              history.replace("/");
            })
            .catch((error) => {
              setError(error.response);
              setSubmitting(false);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form>
            <div className="register-form-container">
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
                type="password"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                className={classes.input}
                label="First Name"
                name="firstName"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                className={classes.input}
                label="Last Name"
                name="lastName"
                variant="outlined"
                onChange={handleChange}
              />
              <Button
                variant="contained"
                className={classes.button}
                color="primary"
                onClick={() => handleSubmit()}
                disabled={isSubmitting}
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

export default Register;
