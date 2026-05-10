import { useTodoContext } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { dispatch } = useTodoContext();

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          dispatch({ type: "TOGGLE_TODO", payload: todo.id })
        }
        aria-label="Toggle task"
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "gray" : "black"
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() =>
          dispatch({ type: "DELETE_TODO", payload: todo.id })
        }
        aria-label="Delete task"
      >
        ❌
      </button>
    </li>
  );
}