import React from "react";
import { useTodo } from "../context/TodoContext";
import styles from "../styles/TodoFilters.module.css";

export default function TodoFilters() {
  const { state, dispatch } = useTodo();

  const filters = ["all", "active", "completed"];

  return (
    <div className={styles.filters}>
      {filters.map((f) => (
        <button
          key={f}
          className={state.filter === f ? styles.active : ""}
          onClick={() => dispatch({ type: "SET_FILTER", filter: f })}
        >
          {f.toUpperCase()}
        </button>
      ))}
    </div>
  );
}