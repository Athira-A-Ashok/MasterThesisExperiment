import { useCallback } from "react";
import { useTodos } from "../context/TodoContext";
import styles from "./TodoFilters.module.css";

export default function TodoFilters({ activeCount }) {
  const { state, dispatch } = useTodos();

  const setFilter = useCallback(
    (f) => dispatch({ type: "SET_FILTER", payload: f }),
    [dispatch]
  );

  const clearCompleted = useCallback(
    () => dispatch({ type: "CLEAR_COMPLETED" }),
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <span>{activeCount} items left</span>

      <div>
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={state.filter === f ? styles.active : ""}
          >
            {f}
          </button>
        ))}
      </div>

      {state.todos.some((t) => t.completed) && (
        <button onClick={clearCompleted}>Clear completed</button>
      )}
    </div>
  );
}