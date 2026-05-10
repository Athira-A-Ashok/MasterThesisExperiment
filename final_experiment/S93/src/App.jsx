import { useEffect, useReducer } from "react";
import { todoReducer, initialState } from "./reducer";
import { useLocalStorage } from "./hooks/useLocalStorage";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

import styles from "./styles/App.module.css";

export default function App() {
  const [stored, setStored] = useLocalStorage("todos-app", initialState);
  const [state, dispatch] = useReducer(todoReducer, stored);

  useEffect(() => {
    setStored(state);
  }, [state]);

  const filteredTodos = state.todos.filter((t) => {
    if (state.filter === "ACTIVE") return !t.completed;
    if (state.filter === "COMPLETED") return t.completed;
    return true;
  });

  const activeCount = state.todos.filter((t) => !t.completed).length;

  return (
    <div className={styles.container}>
      <h1 tabIndex="0">Todo App</h1>

      <TodoForm dispatch={dispatch} />

      <FilterBar dispatch={dispatch} activeCount={activeCount} />

      <TodoList todos={filteredTodos} dispatch={dispatch} />
    </div>
  );
}