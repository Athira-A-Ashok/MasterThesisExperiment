import React from "react";

const TodoItem = React.memo(({ todo, onDelete, onToggle }) => {
  return (
    <li className={`item ${todo.completed ? "completed" : ""}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </div>

      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

export default TodoItem;