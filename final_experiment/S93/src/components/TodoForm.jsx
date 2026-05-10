import { useState } from "react";
import styles from "../styles/TodoForm.module.css";

export default function TodoForm({ dispatch }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    dispatch({ type: "ADD", payload: text });
    setText("");
  };

  return (
    <div className={styles.form}>
      <input
        aria-label="Todo input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Add a task..."
      />

      <button
        aria-label="Add todo"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}