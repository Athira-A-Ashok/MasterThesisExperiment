import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import TodoStats from "./TodoStats";
import styles from "../styles/app.module.css";

export default function TodoApp() {
  return (
    <div className={styles.container}>
      <h1>Todo App</h1>
      <TodoInput />
      <TodoFilters />
      <TodoStats />
      <TodoList />
    </div>
  );
}