import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { ACTIONS } from "../reducer/taskReducer";

export default function TaskInput() {
  const [text, setText] = useState("");
  const { dispatch } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: new Date().toISOString()
      }
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