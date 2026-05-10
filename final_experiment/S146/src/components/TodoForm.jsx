import React, { useState, useCallback } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoForm() {
  const [value, setValue] = useState("");
  const { addTodo } = useTodos();

  const handleAdd = useCallback(() => {
    const text = value.trim();
    if (!text) return;

    addTodo(text);
    setValue("");
  }, [value, addTodo]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div>
      <input
        aria-label="Todo input"
        placeholder="Enter your task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        aria-label="Add task"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}   