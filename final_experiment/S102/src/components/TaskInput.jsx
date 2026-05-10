import { useState } from "react";

function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  // Handle submit
  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return; // prevent empty input

    addTask(trimmed);
    setText("");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        aria-label="Task input"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default TaskInput;