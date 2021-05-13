import { useState } from "react";
import { firebaseAuth } from "../../config/firebase";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebookSquare } from "react-icons/fa";
import styles from "./socialAuth.module.css";
import {
  FacebookProvider,
  GithubProvider,
  GoogleProvider,
} from "../../config/providers";
const SocialAuth = ({ authType }) => {
  const [error, setError] = useState("");
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
  return (
    <>
      <div>{error && <p className="alert"> {error} </p>}</div>
      <div className={styles.socialButtonWrapper}>
        <Button
          size="large"
          onClick={() => handleSocialAuth(GoogleProvider)}
          startIcon={<FcGoogle />}
        >
          {authType ? authType : "Continue"} with Google{" "}
        </Button>
        <Button
          size="large"
          startIcon={<FaGithub />}
          onClick={() => handleSocialAuth(GithubProvider)}
        >
          {authType ? authType : "Continue"} with Github{" "}
        </Button>
        <Button
          size="large"
          startIcon={<FaFacebookSquare />}
          onClick={() => handleSocialAuth(FacebookProvider)}
        >
          {authType ? authType : "Continue"} with Facebook{" "}
        </Button>
      </div>
    </>
  );
};

export default SocialAuth;
