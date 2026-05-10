import React from "react";

function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <li
      style={{
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        aria-label={`Mark ${task.text} as completed`}
      />

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        aria-label={`Delete ${task.text}`}
      >
        ❌
      </button>
    </li>
  );
}

export default React.memo(TodoItem);