import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { firebaseAuth } from "../../config/firebase";
const SignupForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const history = useHistory();

  /*** Hold component state */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSignup(e) {
    e.preventDefault();
    //   Validate user input
    if (!emailRef.current.value) {
      setError("Email field is required");
      return;
    }
    if (!passwordRef.current.value || !confirmPasswordRef.current.value) {
      setError("Complete Password and confirm password fields");
      return;
    }
    if (
      passwordRef.current.value.length < 6 ||
      confirmPasswordRef.current.value.length < 6
    ) {
      setError("Insufficient character for strong password");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Password must match");
      return;
    }

    setLoading(true);

    firebaseAuth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((result) => {
        console.log("[handleSignup ]: success", { result });
        history.push("/");
      })
      .catch((error) => {
        console.log("[handleSignup ]: error", { error });
        setError(error?.message);
      })
      .finally(() => setLoading(false));
  }
  return (
    <form onSubmit={handleSignup}>
      <h2>Create account</h2>
      <div>{error && <p> {error} </p>}</div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" ref={emailRef} id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" ref={passwordRef} id="password" />
      </div>
      <div>
        <label htmlFor="confirm-password">Confirm password</label>
        <input type="password" ref={confirmPasswordRef} id="confirm-password" />
      </div>
      <button type="submit" disabled={loading}>
        Sign up
      </button>
      <div>
        <p>
          Already have an account ? <Link to="/login">Log in</Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
