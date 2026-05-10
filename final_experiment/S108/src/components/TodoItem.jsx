import React from "react";

function TodoItem({ task, dispatch }) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "8px 0"
      }}
    >
      <span
        onClick={() =>
          dispatch({ type: "TOGGLE_TASK", payload: task.id })
        }
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" &&
          dispatch({ type: "TOGGLE_TASK", payload: task.id })
        }
        aria-label="Toggle task"
      >
        {task.text}
      </span>

      <button
        aria-label="Delete task"
        onClick={() =>
          dispatch({ type: "DELETE_TASK", payload: task.id })
        }
      >
        X
      </button>
    </li>
  );
}

export default React.memo(TodoItem);