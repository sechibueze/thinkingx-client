import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/SignupForm";
import Login from "./components/LoginForm";
import Home from "./pages/Home";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
function App() {
  return (
    <Router>
      <Switch>
        <AuthContextProvider>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-password" component={ForgotPasswordForm} />
        </AuthContextProvider>
      </Switch>
    </Router>
  );
}

export default App;
