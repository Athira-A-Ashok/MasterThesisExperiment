import React from "react";
import { ACTIONS } from "../utils/actionTypes";

function TodoItem({ todo, dispatch }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() =>
          dispatch({ type: ACTIONS.TOGGLE, payload: todo.id })
        }
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "gray" : "black",
        }}
      >
        {todo.text}
      </span>

      <button
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE, payload: todo.id })
        }
      >
        ❌
      </button>
    </li>
  );
}

export default React.memo(TodoItem);