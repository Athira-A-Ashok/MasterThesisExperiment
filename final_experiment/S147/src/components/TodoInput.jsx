import React, { useState, useCallback } from "react";

export default function TodoInput({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = text.trim();
      if (!trimmed) return;

      addTask(trimmed);
      setText("");
    },
    [text, addTask]
  );

  return (
    <form onSubmit={handleSubmit} aria-label="Add todo">
      <input
        aria-label="Todo input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}