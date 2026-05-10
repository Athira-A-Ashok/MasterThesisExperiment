import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoItem({ todo }) {
  const { dispatch } = useTodos();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const saveEdit = () => {
    dispatch({
      type: "EDIT",
      payload: { id: todo.id, text: value }
    });
    setEditing(false);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: "TOGGLE", payload: todo.id })}
      />

      {editing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={saveEdit}
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          style={{
            textDecoration: todo.completed ? "line-through" : "none"
          }}
        >
          {todo.text}
        </span>
      )}

      <small>{todo.priority}</small>

      <button onClick={() => dispatch({ type: "DELETE", payload: todo.id })}>
        X
      </button>
    </div>
  );
}