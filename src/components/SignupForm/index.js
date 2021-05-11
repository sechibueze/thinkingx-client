import { gql, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { firebaseAuth } from "../../config/firebase";
export const SIGNUP_MUTATION = gql`
  mutation UserSignup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      disabled
      displayName
      email
      phoneNumber
    }
  }
`;
const SignupForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

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
    const signupData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    signup({
      variables: signupData,
    });
  }

  return (
    <form onSubmit={handleSignup}>
      <h2>Create account</h2>
      <div>{error && <p> {error} </p>}</div>
      <div>{message && <p> {message} </p>}</div>
      <div>
        <label htmlFor="name">Name</label>
        <input type="name" ref={nameRef} id="name" />
      </div>
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
