import React from "react";

export default function StreamMeta({ tasks, dispatch }) {
  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
      <span>{activeCount} items left</span>

      <button
        onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
        className="text-red-500"
      >
        Clear completed
      </button>
    </div>
  );
}