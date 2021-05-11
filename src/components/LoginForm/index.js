import { useRef, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { firebaseAuth } from "../../config/firebase";
import styles from "./styles.module.css";
import {
  FacebookProvider,
  GithubProvider,
  GoogleProvider,
} from "../../config/providers";
import { useAuthContext } from "../../context/AuthContext";
const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { currentUser } = useAuthContext();
  /*** Hold component state */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSocialAuth(provider) {
    firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("User has successfully signed in", result);
        // Get token to local storage
        // Redirect to dashboard
      })
      .catch((error) => {
        console.log("Failed to sign up user", error);
        setError(error?.message || "An error has just occurred, try again");
      });
  }

  function handleLogin(e) {
    e.preventDefault();

    //   Validate user input
    if (!emailRef.current.value) {
      setError("Please enter your email");
      return;
    }
    if (!passwordRef.current.value) {
      setError("You have not entered a password");
      return;
    }
    if (passwordRef.current.value.length < 6) {
      setError("Check the password again");
      return;
    }
    setLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
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

  return (
    <>
      <ul className="social_auth_wrapper">
        <li
          onClick={() => handleSocialAuth(GoogleProvider)}
          className="auth_provider"
        >
          {" "}
          Google Login{" "}
        </li>
        <li
          onClick={() => handleSocialAuth(GithubProvider)}
          className="auth_provider"
        >
          {" "}
          Github Login{" "}
        </li>
        <li
          onClick={() => handleSocialAuth(FacebookProvider)}
          className="auth_provider"
        >
          Facebook Login{" "}
        </li>
      </ul>
      <form onSubmit={handleLogin} className={styles.login_form}>
        <div>{error && <p className="alert"> {error} </p>}</div>

        <h2 className={styles.login_form_title}>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" ref={emailRef} id="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordRef} id="password" />
        </div>

        <button type="submit" disabled={loading}>
          Log in
        </button>
        <div className={styles.login_helpers}>
          <p>
            New User ? <Link to="/signup">Sign up</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot password</Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
