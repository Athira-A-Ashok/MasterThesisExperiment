import React from "react";
import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";
import styles from "../styles/TodoList.module.css";

export default function TodoList() {
  const { state, dispatch } = useTodo();

  const filtered = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className={styles.list}>
      {filtered.length === 0 ? (
        <p>No tasks</p>
      ) : (
        filtered.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}

      {state.todos.some((t) => t.completed) && (
        <button
          className={styles.clear}
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
        >
          Clear Completed
        </button>
      )}
    </div>
  );
}