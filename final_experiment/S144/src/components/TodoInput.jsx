import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const trimmed = text.trim();

    if (!trimmed) return;

    onAdd(trimmed);
    setText("");
  };

  return (
    <div>
      <input
        placeholder="Enter your task"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}