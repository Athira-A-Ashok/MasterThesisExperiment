import React, { useMemo } from "react";
import { ACTIONS } from "../utils/actionTypes";

export default function TodoFooter({ todos, filter, setFilter, dispatch }) {
  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  return (
    <div>
      <p>{activeCount} items left</p>

      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>

      <button
        onClick={() => dispatch({ type: ACTIONS.CLEAR_COMPLETED })}
      >
        Clear Completed
      </button>
    </div>
  );
}