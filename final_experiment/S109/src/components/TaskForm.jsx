// src/components/TaskForm.jsx
import { useState } from "react";

export default function TaskForm({ dispatch }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const trimmed = text.trim();

    if (!trimmed) return; // validation

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    });

    setText("");
  };

  return (
    <div>
      <input
        aria-label="Task input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Enter task..."
      />
      <button aria-label="Add task" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}