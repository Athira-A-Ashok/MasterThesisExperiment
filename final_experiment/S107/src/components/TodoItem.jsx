import React, { useCallback } from "react";

function TodoItem({ task, onToggle, onDelete }) {
  const toggle = useCallback(() => {
    onToggle(task.id);
  }, [task.id, onToggle]);

  const remove = useCallback(() => {
    onDelete(task.id);
  }, [task.id, onDelete]);

  return (
    <li>
      <span
        onClick={toggle}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
        aria-label={`Toggle ${task.text}`}
      >
        {task.text}
      </span>

      <button onClick={remove} aria-label="Delete task">
        🗑
      </button>
    </li>
  );
}

export default React.memo(TodoItem);