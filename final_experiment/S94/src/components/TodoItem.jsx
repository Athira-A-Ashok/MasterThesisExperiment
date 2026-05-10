function TodoItem({ todo, dispatch }) {
  return (
    <div className="item">
      <div
        className={`text ${todo.completed ? "done" : ""}`}
        onClick={() =>
          dispatch({ type: "TOGGLE_TODO", payload: todo.id })
        }
      >
        {todo.text}
      </div>

      <button
        className="delete"
        onClick={() =>
          dispatch({ type: "DELETE_TODO", payload: todo.id })
        }
      >
        ✕
      </button>
    </div>
  );
}

export default TodoItem;