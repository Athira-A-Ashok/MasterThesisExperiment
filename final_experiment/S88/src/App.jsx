import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import styles from "./styles/App.module.css";
import { useTodo } from "./context/TodoContext";

export default function App() {
  const { state } = useTodo();

  const activeCount = state.todos.filter((t) => !t.completed).length;

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>

      <TodoInput />

      <div className={styles.meta}>
        <span>{activeCount} items left</span>
      </div>

      <TodoFilters />

      <TodoList />
    </div>
  );
}