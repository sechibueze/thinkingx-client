import { firebaseAuth } from "../../config/firebase";
import { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import Logo from "../Logo";
import SocialAuth from "../SocialAuth";
import { useAuthContext } from "../../context/AuthContext";
// Material UI components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { authFormStyles } from "../../_utils/styles";
const useStyles = makeStyles((theme) => {
  return {
    ...authFormStyles,
  };
});
const LoginForm = () => {
  const history = useHistory();
  const { currentUser } = useAuthContext();
  const classes = useStyles();
  /*** Hold component state */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange({ target }) {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  }

  function handleLogin(e) {
    e.preventDefault();
    const { email, password } = data;

    console.log("data ", data);
    //   Validate user input
    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!password) {
      setError("You have not entered a password");
      return;
    }
    if (password.length < 6) {
      setError("Check the password again");
      return;
    }
    setLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("[handleSignup ]: success", { result });
        // 1 Get the user toke
        // 2 Put the token in a cookie
        // 3 Redirect to Auth page
        history.push("/");
      })
      .catch((error) => {
        console.log("[handleSignup ]: error", { error });
        if (error.code.endsWith("user-not-found")) {
          setError("Account does not exist");
          return;
        }
        setError(error?.message || "Login attempt failed");
      })
      .finally(() => {
        /** Whether you login or not, we just have to stop loading */
        setLoading(false);
      });
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }
  const { email, password } = data;
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
          <form noValidate onSubmit={handleLogin} className={classes.form}>
            <div className={classes.socialAuth}>
              <SocialAuth />
            </div>
            <div>{error && <p className="alert"> {error} </p>}</div>
            <div className={classes.formId}>
              <Logo size="36" color="#833cef" />
              <Typography variant="h4" gutterBottom>
                Login
              </Typography>
            </div>

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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Login{" "}
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
                New User ? <Link to="/signup">Sign up</Link>
              </Typography>
              <Typography variant="body2">
                <Link to="/forgot-password">Forgot password</Link>
              </Typography>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginForm;
