import React from "react";

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div style={{ display: "flex", gap: 10, margin: "8px 0" }}>
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.text}
      </span>

      <small>{new Date(task.createdAt).toLocaleString()}</small>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}

export default React.memo(TaskItem);