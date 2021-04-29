import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from "../../config/firebase";
const SignupForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  /*** Hold component state */
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSignup(e) {
    e.preventDefault();
    //   Validate user input
    if (!emailRef.current.value) {
      setError("Email field is required");
      return;
    }
    if (!passwordRef.current.value || !confirmPasswordRef.current.value) {
      setError("Password field is required");
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

    firebaseAuth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((result) => {
        console.log("[handleSignup ]: success", { result });
      })
      .catch((error) => {
        console.log("[handleSignup ]: error", { error });
      });
  }
  return (
    <form onSubmit={handleSignup}>
      <div>
        {error && <p> {error} </p>}
        {message && <p> {message} </p>}
      </div>
      <div>
        <input type="email" ref={emailRef} />
      </div>
      <div>
        <input type="password" ref={passwordRef} />
      </div>
      <div>
        <input type="password" ref={confirmPasswordRef} />
      </div>
      <button type="submit">Sign up</button>
      <div>
        <p>
          Already have an account ? <Link to="/login">Log in</Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
