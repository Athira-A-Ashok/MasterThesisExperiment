import { useState, useCallback } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const trimmed = text.trim();
      if (!trimmed) return;

      onAdd(trimmed);
      setText("");
    },
    [text, onAdd]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Task input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}