import { useState } from "react";
import styles from "./TodoInput.module.css";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onAdd(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={`${styles.container} flex gap-2`}>
      <input
        className="flex-1 border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}






