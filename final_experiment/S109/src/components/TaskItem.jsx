// src/components/TaskItem.jsx
import React from "react";

function TaskItem({ task, dispatch }) {
  return (
    <div
      role="listitem"
      tabIndex={0}
      aria-label={`Task ${task.text}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
      }}
    >
      <span
        onClick={() =>
          dispatch({ type: "TOGGLE_TASK", payload: task.id })
        }
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.text}
      </span>

      <button
        aria-label="Delete task"
        onClick={() =>
          dispatch({ type: "DELETE_TASK", payload: task.id })
        }
      >
        ❌
      </button>
    </div>
  );
}

export default React.memo(TaskItem);