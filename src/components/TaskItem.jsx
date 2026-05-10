// src/components/TaskItem.jsx
import React from "react";

const TaskItem = React.memo(({ task, onToggle, onDelete }) => {
  return (
    <li className="task-item">
      <span
        onClick={() => onToggle(task.id)}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>

      <small>{new Date(task.createdAt).toLocaleString()}</small>

      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
});

export default TaskItem;