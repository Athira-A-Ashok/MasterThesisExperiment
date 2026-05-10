import { useState, useCallback } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleAdd = useCallback(() => {
    onAdd(text);
    setText("");
  }, [text, onAdd]);

  return (
    <div>
      <input
        value={text}
        placeholder="Enter your task"
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}