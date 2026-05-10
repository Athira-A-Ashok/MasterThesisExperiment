import { useState } from "react";
import { ACTIONS } from "../reducer/todoReducer";

export default function TodoInput({ dispatch }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return; // validation

    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Add task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}