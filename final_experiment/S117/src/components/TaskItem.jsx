import React, { useCallback } from "react";

function TaskItem({ task, onToggle, onDelete }) {
  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [onToggle, task.id]);

  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [onDelete, task.id]);

  return (
    <li
      role="listitem"
      aria-label={`Task ${task.text}`}
      tabIndex={0}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        aria-label="Toggle task"
      />

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none"
        }}
      >
        {task.text}
      </span>

      <button onClick={handleDelete} aria-label="Delete task">
        🗑
      </button>
    </li>
  );
}

export default React.memo(TaskItem);