import React from "react";

function TodoItem({ todo, dispatch }) {
  return (
    <li className={`todo ${todo.completed ? "done" : ""}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            dispatch({ type: "TOGGLE", payload: todo.id })
          }
        />
        <span>{todo.text}</span>
      </label>

      <button
        onClick={() =>
          dispatch({ type: "DELETE", payload: todo.id })
        }
      >
        🗑
      </button>
    </li>
  );
}

export default React.memo(TodoItem);