import React, { useCallback } from "react";

function TaskItem({ task, onDelete, onToggle }) {
  const handleDelete = useCallback(() => {
    onDelete(task.id);
  }, [onDelete, task.id]);

  const handleToggle = useCallback(() => {
    onToggle(task.id);
  }, [onToggle, task.id]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 8,
        borderBottom: "1px solid #ddd",
      }}
    >
      <span
        onClick={handleToggle}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {task.text}
      </span>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default React.memo(TaskItem);