import React from "react";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      role="listitem"
      aria-label={`Task ${todo.text}`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label="Toggle task"
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
      >
        ❌
      </button>
    </li>
  );
}

export default React.memo(TodoItem);