import { useState } from "react";
import { ACTIONS } from "../utils/actionTypes";

export default function TodoInput({ dispatch }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    dispatch({ type: ACTIONS.ADD, payload: todo });
    setText("");
  };

  return (
    <div>
      <input
        value={text}
        placeholder="Enter your task"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}