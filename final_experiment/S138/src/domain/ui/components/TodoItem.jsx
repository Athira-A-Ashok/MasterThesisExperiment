import { ACTIONS } from "../../state/actions";

export default function TodoItem({ todo, dispatch }) {
  return (
    <li>
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
        aria-checked={todo.completed}
      >
        {todo.text}
      </span>

      <button
        onClick={() =>
          dispatch({ type: ACTIONS.TOGGLE_TODO, payload: todo.id })
        }
      >
        Toggle
      </button>

      <button
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: todo.id })
        }
      >
        Delete
      </button>
    </li>
  );
}