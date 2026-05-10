import { useState } from "react";
import { validateTodoInput } from "../utils/validators";

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleAdd = () => {
    const result = validateTodoInput(text);

    if (!result.valid) {
      setError(result.error);
      return;
    }

    addTodo({
      id: crypto.randomUUID(),
      text: result.value,
      completed: false,
      createdAt: Date.now(),
    });

    setText("");
    setError("");
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAdd}>Add</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}