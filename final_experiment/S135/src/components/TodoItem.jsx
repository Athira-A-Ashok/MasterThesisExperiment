import React, { memo } from "react";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          opacity: todo.completed ? 0.6 : 1,
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default memo(TodoItem);