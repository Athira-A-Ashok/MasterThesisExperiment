import { useState } from "react";
import { sanitizeText, createTodo } from "../utils";

export default function TodoInput({ dispatch }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const clean = sanitizeText(value);

    if (!clean) return;

    dispatch({
      type: "ADD",
      payload: createTodo(clean)
    });

    setValue("");
  };

  return (
    <div className="todo-input">
      <input
        value={value}
        placeholder="Add a task..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}