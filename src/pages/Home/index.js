import { gql, useQuery } from "@apollo/client";
import { useAuthContext, useToken } from "../../context/AuthContext";
import TodoCard from "../../components/TodoCard";

const TODOS_QUERY = gql`
  query TodosQuery {
    todos {
      title
      description
      completed
      due_date
    }
  }
`;

const Home = () => {
  const token = useToken();
  const { currentUser, logout } = useAuthContext();
  const { loading, data, error } = useQuery(TODOS_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
  return (
    <>
      {loading && <p>Fetching your todos</p>}
      {error && <p>Oops</p>}
      <div className="df">
        {data &&
          data.todos.map((todo, idx) => <TodoCard key={idx} todo={todo} />)}
      </div>

      <h1> Welcom, {currentUser.email} </h1>
      <div>
        <span onClick={() => logout()}>Log out </span>
      </div>
    </>
  );
};

export default Home;
