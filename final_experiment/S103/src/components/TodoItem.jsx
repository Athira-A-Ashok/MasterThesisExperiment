import React, { useCallback } from "react";
import { useTodos } from "../hooks/useTodos";
import styles from "../styles/TodoItem.module.css";

function TodoItem({ todo }) {
  const { dispatch } = useTodos();

  const toggle = useCallback(() => {
    dispatch({ type: "TOGGLE", payload: todo.id });
  }, [dispatch, todo.id]);

  const remove = useCallback(() => {
    dispatch({ type: "DELETE", payload: todo.id });
  }, [dispatch, todo.id]);

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggle}
        aria-label={`Mark ${todo.text} as completed`}
      />

      <span
        className={todo.completed ? styles.completed : ""}
        tabIndex="0"
      >
        {todo.text}
      </span>

      <button
        onClick={remove}
        className={styles.delete}
        aria-label={`Delete ${todo.text}`}
      >
        ✕
      </button>
    </li>
  );
}

export default React.memo(TodoItem);