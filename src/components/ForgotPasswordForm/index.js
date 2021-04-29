import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../config/firebase";
const ForgotPasswordForm = () => {
  const emailRef = useRef();

  /*** Hold component state */
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function sendPasswordResetToken(e) {
    e.preventDefault();

    //   Validate user input
    if (!emailRef.current.value) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    return firebaseAuth
      .sendPasswordResetEmail(emailRef.current.value)
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
    <form onSubmit={sendPasswordResetToken}>
      <h2>Forgot Password</h2>
      <div>{error && <p> {error} </p>}</div>
      <div>{message && <p> {message} </p>}</div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" ref={emailRef} id="email" />
      </div>

      <button type="submit" disabled={loading}>
        Send password
      </button>
      <div>
        <p>
          Login here ? <Link to="/login">Log in</Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
