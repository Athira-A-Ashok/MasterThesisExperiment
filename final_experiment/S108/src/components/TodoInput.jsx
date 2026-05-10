import { useState } from "react";

export default function TodoInput({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) return;

    addTask(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Task input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
      />
      <button type="submit">Add</button>
    </form>
  );
}