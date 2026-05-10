import { useMemo } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoFooter() {
  const { state, dispatch } = useTodos();

  const activeCount = useMemo(
    () => state.tasks.filter((t) => !t.completed).length,
    [state.tasks]
  );

  const hasCompleted = state.tasks.some((t) => t.completed);

  return (
    <div className="footer">
      <span>{activeCount} items left</span>

      {hasCompleted && (
        <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
          Clear Completed
        </button>
      )}
    </div>
  );
}