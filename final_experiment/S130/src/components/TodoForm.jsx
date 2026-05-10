import { useState, useRef } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoForm() {
  const { addTodo } = useTodos();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = input.trim();

    if (!trimmed) {
      setError("Task cannot be empty");
      return;
    }

    addTodo(trimmed);
    setInput("");
    setError("");
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        aria-label="Add task"
      />
      <button type="submit">Add</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}