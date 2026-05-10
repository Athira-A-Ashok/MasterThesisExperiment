import { memo, useCallback, useRef, useEffect } from "react";
import { useTodos } from "../context/TodoContext";
import styles from "./TodoItem.module.css";

function TodoItem({ todo }) {
  const { dispatch } = useTodos();
  const itemRef = useRef();

  const toggle = useCallback(() => {
    dispatch({ type: "TOGGLE_TODO", payload: todo.id });
  }, [dispatch, todo.id]);

  const remove = useCallback(() => {
    dispatch({ type: "DELETE_TODO", payload: todo.id });
  }, [dispatch, todo.id]);

  useEffect(() => {
    itemRef.current?.focus();
  }, []);

  return (
    <li
      ref={itemRef}
      tabIndex="0"
      className={`${styles.item} ${
        todo.completed ? styles.completed : ""
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggle}
        aria-label="Toggle todo"
      />
      <span>{todo.text}</span>
      <button onClick={remove} aria-label="Delete todo">
        ✕
      </button>
    </li>
  );
}

export default memo(TodoItem);