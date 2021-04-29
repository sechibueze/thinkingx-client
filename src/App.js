import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/SignupForm";
const Home = () => <h1>Home</h1>;
const Login = () => <h1>Login</h1>;
function App() {
  return (
    <Router>
      <Switch>
        <AuthContextProvider>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </AuthContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
