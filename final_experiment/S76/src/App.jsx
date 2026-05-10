import { useMemo } from "react";
import { TodoProvider, useTodos } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import styles from "./App.module.css";

function AppContent() {
  const { state } = useTodos();

  const activeCount = useMemo(
    () => state.todos.filter((t) => !t.completed).length,
    [state.todos]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todos</h1>

      <TodoInput />
      <TodoList />
      <TodoFilters activeCount={activeCount} />
    </div>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}