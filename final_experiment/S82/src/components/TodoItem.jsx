import { useState } from "react";

export default function TodoItem({ todo, updateTodo, deleteTodo, toggleComplete }) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(todo);

  const handleSave = () => {
    updateTodo(todo.id, editData);
    setEditing(false);
  };

  return (
    <div className={`todo ${todo.completed ? "completed" : ""}`}>
      {editing ? (
        <>
          <input
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
          />
          <input
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <div>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <small>{todo.priority} | {todo.dueDate}</small>
          </div>

          <div className="actions">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}