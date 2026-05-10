import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import styles from "./TodoInput.module.css";

const TodoInput = () => {
  const [text, setText] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = () => {
    addTodo(text);
    setText("");
  };

  return (
    <div className={styles.container}>
      <input
        aria-label="Add new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Add a task..."
        className={styles.input}
      />
      <button
        aria-label="Add task"
        onClick={handleSubmit}
        className={styles.button}
      >
        Add
      </button>
    </div>
  );
};

export default TodoInput;