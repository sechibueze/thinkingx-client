import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/SignupForm";
import Login from "./components/LoginForm";
import Home from "./pages/Home";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { GRAPHQL_SERVER_URI } from "./constants";
// Configure Apollo client
const client = new ApolloClient({
  uri: GRAPHQL_SERVER_URI,
  cache: new InMemoryCache(),
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
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <AuthContextProvider>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/forgot-password"
              component={ForgotPasswordForm}
            />
          </AuthContextProvider>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
