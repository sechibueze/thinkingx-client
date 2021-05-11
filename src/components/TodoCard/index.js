import styles from "./styles.module.css";
const TodoCard = ({ todo }) => {
  const { title, completed } = todo;
  return (
    <div className={styles.todo_card}>
      <h3> {title} </h3>
      <div>{completed ? "Done" : "Undone"}</div>
    </div>
  );
};

export default TodoCard;
