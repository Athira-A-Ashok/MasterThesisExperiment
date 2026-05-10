import React from "react";

function TaskItem({ task, dispatch }) {
  return (
    <div style={{ display: "flex", gap: "10px", margin: "8px 0" }}>
      <span
        onClick={() =>
          dispatch({ type: "TOGGLE_TASK", payload: task.id })
        }
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {task.text}
      </span>

      <button
        onClick={() =>
          dispatch({ type: "DELETE_TASK", payload: task.id })
        }
      >
        Delete
      </button>
    </div>
  );
}

export default React.memo(TaskItem);