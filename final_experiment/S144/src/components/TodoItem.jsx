import React from "react";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div>
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
    </div>
  );
}

export default React.memo(TodoItem);