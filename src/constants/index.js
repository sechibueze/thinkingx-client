export const GRAPHQL_SERVER_URI =
  process.env.NODE_ENV === "production"
    ? "https://thinkingx.herokuapp.com"
    : "http://localhost:4000";
export const AUTH_TOKEN_KEY = "AUTH_TOKEN";

export const FIREBASE_CONFIG = {
  REACT_APP_FIREBASE_API_KEY: "AIzaSyD5Ah8XR3Af88N3E_zsa8Uu7DH0vodZ4fY",
  REACT_APP_FIREBASE_AUTH_DOMAIN: "thinkingx-611dc.firebaseapp.com",
  REACT_APP_FIREBASE_PROJECT_ID: "thinkingx-611dc",
  REACT_APP_FIREBASE_STORAGE_BUCKET: "thinkingx-611dc.appspot.com",
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID: "173512552439",
  REACT_APP_FIREBASE_APP_ID: "1:173512552439:web:9b0f2582306c18779a48f2",
};
