import { memo } from "react";

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span style={{
          textDecoration: todo.done ? "line-through" : "none",
          color: todo.done ? "gray" : "black"
        }}>
          {todo.text}
        </span>
      </label>

      <button onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
});

export default TodoItem;