import { Redirect, Route } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
