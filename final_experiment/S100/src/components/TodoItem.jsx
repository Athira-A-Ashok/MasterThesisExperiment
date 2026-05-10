import React from "react";
import { useTodos } from "../hooks/useTodos";
import styles from "./TodoItem.module.css";

const TodoItem = React.memo(({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        aria-label="Toggle task"
      />

      <span
        className={`${styles.text} ${
          todo.completed ? styles.completed : ""
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        aria-label="Delete task"
        className={styles.delete}
      >
        🗑
      </button>
    </li>
  );
});

export default TodoItem;