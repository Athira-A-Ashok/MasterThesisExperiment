export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        marginBottom: "8px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        background: todo.completed ? "#f3f3f3" : "white",
      }}
    >
      <span
        onClick={() => onToggle(todo.id)}
        style={{
          cursor: "pointer",
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#000",
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>🗑</button>
    </div>
  );
}