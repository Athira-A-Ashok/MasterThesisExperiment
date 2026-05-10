import { useState } from "react";

export default function TodoInput({ onAdd, inputRef }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <div>
      <label htmlFor="todo-input" className="sr-only">
        Add new task
      </label>

      <input
        id="todo-input"
        ref={inputRef}
        type="text"
        value={value}
        placeholder="Add a task..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        aria-label="Task input"
      />

      <button onClick={handleSubmit} aria-label="Add task">
        Add
      </button>
    </div>
  );
}