import { useState } from "react";

export default function TodoItem({ task, deleteTask, toggleTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleEdit = () => {
    if (!text.trim()) return;
    editTask(task.id, text);
    setIsEditing(false);
  };

  return (
    <div className={`item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          autoFocus
        />
      ) : (
        <div className="task-info" onDoubleClick={() => setIsEditing(true)}>
          <span>{task.text}</span>
          <small>{task.createdAt}</small>
        </div>
      )}

      <button onClick={() => deleteTask(task.id)}>🗑</button>
    </div>
  );
}