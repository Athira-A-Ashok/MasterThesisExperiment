import React from "react";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#000",
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>X</button>
    </li>
  );
}

export default React.memo(TodoItem);