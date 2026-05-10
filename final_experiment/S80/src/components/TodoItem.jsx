function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className="todo-item">
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <span className={todo.completed ? "completed" : ""}>
          {todo.text}
        </span>
      </div>

      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;