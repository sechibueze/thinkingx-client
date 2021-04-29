import { useAuthContext } from "../../context/AuthContext";
const Home = () => {
  const { currentUser, logout } = useAuthContext();
  return (
    <>
      <h1> Welcom, {currentUser.email} </h1>
      <div>
        <span onClick={() => logout()}>Log out </span>
      </div>
      <p>
        <pre>{JSON.stringify(currentUser, undefined, 4)}</pre>
      </p>
    </>
  );
};

export default Home;
