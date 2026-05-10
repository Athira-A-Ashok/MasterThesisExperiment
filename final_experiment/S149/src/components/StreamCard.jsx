import React from "react";

export default function StreamCard({ task, dispatch }) {
  return (
    <div
      className={`flex justify-between items-center p-2 border rounded ${
        task.completed ? "text-gray-400 line-through" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() =>
            dispatch({ type: "TOGGLE_TASK", payload: task.id })
          }
        />
        <span>{task.text}</span>
      </div>

      <button
        onClick={() =>
          dispatch({ type: "DELETE_TASK", payload: task.id })
        }
        className="text-red-500"
      >
        🗑
      </button>
    </div>
  );
}