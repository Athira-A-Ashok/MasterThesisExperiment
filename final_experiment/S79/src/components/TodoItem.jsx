const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <div style={styles.item}>
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          ...styles.text,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#888" : "#000",
        }}
      >
        {todo.text}
      </span>

      <div>
        <button
          onClick={() => toggleTodo(todo.id)}
          style={styles.completeBtn}
        >
          {todo.completed ? "Undo" : "Complete"}
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  text: {
    cursor: "pointer",
  },
  completeBtn: {
    marginRight: "10px",
    padding: "5px 8px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "5px 8px",
    cursor: "pointer",
    backgroundColor: "red",
    color: "white",
    border: "none",
  },
};

export default TodoItem;