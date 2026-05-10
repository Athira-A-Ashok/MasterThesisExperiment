import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import styles from "./styles/App.module.css";

export default function App() {
  return (
    <TodoProvider>
      <main className={styles.container}>
        <h1>Todo App</h1>
        <TodoInput />
        <TodoList />
        <TodoFilter />
      </main>
    </TodoProvider>
  );
}