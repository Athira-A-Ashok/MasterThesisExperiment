import { useState, useCallback } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleAdd = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setText("");
  }, [text, onAdd]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Enter") handleAdd();
  }, [handleAdd]);

  return (
    <div>
      <input
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label="Todo input"
        placeholder="Enter task..."
      />
      <button onClick={handleAdd} aria-label="Add todo">
        Add
      </button>
    </div>
  );
}