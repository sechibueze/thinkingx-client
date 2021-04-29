import { useRef, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { firebaseAuth } from "../../config/firebase";
import { useAuthContext } from "../../context/AuthContext";
const LoginForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { currentUser } = useAuthContext();
  /*** Hold component state */
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>{error && <p> {error} </p>}</div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" ref={emailRef} id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordRef} id="password" />
      </div>

      <button type="submit" disabled={loading}>
        Log in
      </button>
      <div>
        <p>
          New User ? <Link to="/signup">Sign up</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot password</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
