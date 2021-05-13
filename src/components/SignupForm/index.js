import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SIGNUP_MUTATION } from "../../graphql/auth";
import SocialAuth from "../SocialAuth";
import Logo from "../Logo";
// import styles from "./signup.module.css";
/**** Material UI stuff */
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { authFormStyles } from "../../_utils/styles";

const useStyles = makeStyles((theme) => {
  return {
    // ...theme,
    ...authFormStyles,
  };
});
const SignupForm = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const { email, password, confirmPassword, name } = data;

  /*** Hold component state */
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted(data) {
      console.log("Signup success", data);
      setMessage("Great at signup");
    },
    onError(error) {
      console.log("Oops, error occurred", error);
      setError("An error occured");
    },
  });

  function handleChange({ target }) {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  }

  function handleSignup(e) {
    e.preventDefault();
    //   Validate user input
    console.log("signup d", data);
    if (!name) {
      setError("Name field is required");
      return;
    }
    if (!email) {
      setError("Email field is required");
      return;
    }
    if (!password || !confirmPassword) {
      setError("Complete Password and confirm password fields");
      return;
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      setError("Insufficient character for strong password");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password must match");
      return;
    }
    const signupData = {
      name,
      email,
      password,
      confirmPassword,
    };

    signup({
      variables: signupData,
    });
  }

  return (
    <>
      <Grid
        container
        className={classes.root}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xm={12} md={6}>
          <form noValidate onSubmit={handleSignup} className={classes.form}>
            <div className={classes.socialAuth}>
              <SocialAuth authType="Start" />
            </div>
            <div>{error && <p className="alert"> {error} </p>}</div>
            <div>{message && <p className="alert"> {message} </p>}</div>
            <div className={classes.formId}>
              <Logo size="36" color="#833cef" />
              <Typography variant="h4" gutterBottom>
                Create account
              </Typography>
            </div>

            <TextField
              type="name"
              onChange={handleChange}
              value={name}
              id="name"
              name="name"
              label="Name"
              fullWidth
              className={classes.textField}
            />
            <TextField
              type="email"
              onChange={handleChange}
              value={email}
              id="email"
              name="email"
              label="Email"
              fullWidth
              className={classes.textField}
            />
            <TextField
              type="password"
              onChange={handleChange}
              value={password}
              name="password"
              id="password"
              label="Password"
              fullWidth
              className={classes.textField}
            />
            <TextField
              type="password"
              onChange={handleChange}
              value={confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm password"
              fullWidth
              className={classes.textField}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Create account{" "}
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={35}
                  thickness={5}
                  value={100}
                  color="primary"
                  variant="indeterminate"
                />
              )}
            </Button>
            <div className={classes.authHelperText}>
              <Typography variant="body2">
                Already have an account? <Link to="/login">Log in</Link>
              </Typography>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SignupForm;
