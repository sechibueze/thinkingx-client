import { useState } from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../config/firebase";
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
const ForgotPasswordForm = () => {
  const classes = useStyles();

  const [data, setData] = useState({ email: "" });
  const { email } = data;
  /*** Hold component state */
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  function handleChange({ target }) {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  }
  function sendPasswordResetToken(e) {
    e.preventDefault();

    //   Validate user input
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    return firebaseAuth
      .sendPasswordResetEmail(email)
      .then((result) => {
        console.log("[handleSignup ]: success", { result });
        setMessage("Check your email for directions");
      })
      .catch((error) => {
        console.log("[sendPasswordResetToken ]: error", { error });
        setError(error?.message || "Failed to send Password Reset Token");
      })
      .finally(() => {
        /** Whether you login or not, we just have to stop loading */
        setLoading(false);
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
          <form
            noValidate
            onSubmit={sendPasswordResetToken}
            className={classes.form}
          >
            <div>{error && <p className="alert"> {error} </p>}</div>
            <div>{message && <p className="alert"> {message} </p>}</div>
            <div className={classes.formId}>
              <Logo size="36" color="#833cef" />
              <Typography variant="h4" gutterBottom>
                Forgot Reset Request
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Send{" "}
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
                I just remembered it ? <Link to="/login">Log in</Link>
              </Typography>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPasswordForm;
