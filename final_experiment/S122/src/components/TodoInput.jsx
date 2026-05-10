import { useState } from "react";
import styles from "../styles/TodoInput.module.css";

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const value = text.trim();
    if (!value) return;

    addTodo(value);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className={`${styles.wrapper} flex gap-2 mb-4`}>
      <input
        className="flex-1 border p-2 rounded"
        value={text}
        placeholder="Add a new task..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}