export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          color: task.completed ? "gray" : "black"
        }}
      >
        {task.text}
      </span>

      <button onClick={() => onDelete(task.id)}>🗑</button>
    </div>
  );
}