export default function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className="item">
      <div
        className={`text ${todo.completed ? "completed" : ""}`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </div>

      <div className="actions">
        <button onClick={() => toggleTodo(todo.id)}>
          {todo.completed ? "Undo" : "Done"}
        </button>

        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
      </div>
    </div>
  );
}