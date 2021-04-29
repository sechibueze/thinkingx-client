import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth } from "../config/firebase";
const AuthContext = createContext();

/*** Export a useAuthContext function for consuming the authContextData from other modules */
export function useAuthContext() {
  return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
  /**By default, we are loading until after the onAuthStateChanged had ran confirmed our status
   * before we can proceed to load child components
   */
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  function logout() {
    return firebaseAuth.signOut();
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      setCurrentUser(user); // be sure to set the user before cancelling the loading
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authContextData = {
    currentUser,
    login: () => {},
    logout,
  };

  if (loading) {
    return <h1> Loading...checking auth status</h1>;
  }
  return (
    <AuthContext.Provider value={authContextData}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
