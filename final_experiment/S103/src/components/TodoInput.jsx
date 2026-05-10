import { useState, useCallback } from "react";
import { useTodos } from "../hooks/useTodos";
import styles from "../styles/TodoInput.module.css";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { dispatch } = useTodos();

  const handleAdd = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false
      }
    });

    setText("");
  }, [text, dispatch]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") handleAdd();
    },
    [handleAdd]
  );

  return (
    <div className={styles.wrapper}>
      <label htmlFor="todo-input" className={styles.hidden}>
        Add Task
      </label>

      <input
        id="todo-input"
        className={styles.input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
      />

      <button
        className={styles.button}
        onClick={handleAdd}
        aria-label="Add task"
      >
        Add
      </button>
    </div>
  );
}