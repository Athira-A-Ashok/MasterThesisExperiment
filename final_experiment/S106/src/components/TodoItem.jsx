import React from "react";
import { ACTIONS } from "../reducer/todoReducer";

function TodoItem({ task, dispatch }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            dispatch({ type: ACTIONS.TOGGLE, payload: task.id })
          }
        />
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.text}
        </span>
      </label>

      <button
        aria-label="Delete task"
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE, payload: task.id })
        }
      >
        ✕
      </button>
    </li>
  );
}

export default React.memo(TodoItem);