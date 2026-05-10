import { useState, useCallback, useRef } from "react";
import { useTodos } from "../context/TodoContext";
import styles from "./TodoInput.module.css";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { dispatch } = useTodos();
  const inputRef = useRef();

  const handleAdd = useCallback(() => {
    dispatch({ type: "ADD_TODO", payload: text });
    setText("");
    inputRef.current.focus();
  }, [text, dispatch]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <input
      ref={inputRef}
      className={styles.input}
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder="What needs to be done?"
      aria-label="Add todo"
    />
  );
}