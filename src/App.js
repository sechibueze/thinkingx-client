import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
// import ThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

import { Home, Signup, Login } from "./pages";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Layout from "./components/Layout";

import { AUTH_TOKEN_KEY, GRAPHQL_SERVER_URI } from "./constants";
import { THEME } from "./constants";
const theme = createMuiTheme(THEME);
// Configure Apollo client
const client = new ApolloClient({
  uri: GRAPHQL_SERVER_URI,
  cache: new InMemoryCache(),
  credentials: "include",
  headers: {
    authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
  },
});
client
  .query({
    query: gql`
      query Todos {
        todos {
          title
          description
          completed
          due_date
        }
      }
    `,
  })
  .then((result) => console.log("Apollo client connected", result))
  .catch((error) => console.log("Apollo client failed : ", error));
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <AuthContextProvider>
              <Layout>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPasswordForm}
                />
              </Layout>
            </AuthContextProvider>
          </Switch>
        </Router>
      </ApolloProvider>
    </MuiThemeProvider>
  );
}

export default App;
