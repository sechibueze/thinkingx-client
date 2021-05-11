export const GRAPHQL_SERVER_URI =
  process.env.NODE_ENV === "production"
    ? "https://thinkingx.herokuapp.com/graphql"
    : "http://localhost:4000";
export const AUTH_TOKEN_KEY = "AUTH_TOKEN";
