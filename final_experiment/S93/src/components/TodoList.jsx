import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

export default function TodoList({ todos, dispatch }) {
  return (
    <ul className={styles.list} aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </ul>
  );
}