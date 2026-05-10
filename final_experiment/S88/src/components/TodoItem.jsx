import React from "react";
import { useTodo } from "../context/TodoContext";
import styles from "../styles/TodoItem.module.css";

function TodoItem({ todo }) {
  const { dispatch } = useTodo();

  return (
    <div className={styles.item}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
        />
        <span className={todo.completed ? styles.done : ""}>
          {todo.text}
        </span>
      </label>

      <button onClick={() => dispatch({ type: "DELETE", id: todo.id })}>
        🗑
      </button>
    </div>
  );
}

export default React.memo(TodoItem);