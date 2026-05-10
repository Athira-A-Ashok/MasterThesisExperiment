export default function TodoItem({
  todo,
  toggleComplete,
  toggleImportant,
  togglePin,
  deleteTodo,
}) {
  const renderFile = () => {
    if (!todo.file) return null;

    const { type, data } = todo.file;

    if (type.startsWith("image"))
      return <img src={data} width="100" />;

    if (type.startsWith("audio"))
      return <audio controls src={data} />;

    if (type.startsWith("video"))
      return <video controls width="200" src={data} />;

    return (
      <a href={data} download>
        Download File
      </a>
    );
  };

  return (
    <div className={`todo ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      <span>{todo.text}</span>

      {todo.important && <strong>⭐</strong>}
      {todo.pinned && <strong>📌</strong>}

      {renderFile()}

      <button onClick={() => toggleImportant(todo.id)}>Important</button>
      <button onClick={() => togglePin(todo.id)}>Pin</button>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
}