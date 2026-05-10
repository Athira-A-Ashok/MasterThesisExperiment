import { useState } from "react";
import { MAX_TITLE_LENGTH } from "../utils/constants";
import { validateTodo } from "../utils/validation";

export default function TodoInput({ onAdd, todos }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const remaining = MAX_TITLE_LENGTH - value.length;

  const handleAdd = () => {
    const result = validateTodo(value, todos);

    if (!result.valid) {
      setError(result.errors.title);
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      title: result.value,
      completed: false,
      createdAt: Date.now(),
    });

    setValue("");
    setError("");
  };

  return (
    <div>
      <input
        value={value}
        placeholder="Enter your task"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />

      <button onClick={handleAdd}>Add</button>

      <div>
        <small>{remaining} characters left</small>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}