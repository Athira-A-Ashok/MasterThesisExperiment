import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, editTodo } from "../features/todo/todoSlice";
import { useState } from "react";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(todo.title);

  const saveEdit = () => {
    dispatch(editTodo({ id: todo.id, title: value }));
    setEditMode(false);
  };

  return (
    <div className={`todo ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />

      {editMode ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={saveEdit}
        />
      ) : (
        <div className="content" onDoubleClick={() => setEditMode(true)}>
          <p>{todo.title}</p>
          <small>{todo.createdAt}</small>
        </div>
      )}

      <button onClick={() => dispatch(deleteTodo(todo.id))}>🗑</button>
    </div>
  );
}