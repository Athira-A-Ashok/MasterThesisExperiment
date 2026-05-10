import React from "react";

export default function StreamFilter({ filter, dispatch }) {
  const options = ["all", "active", "completed"];

  return (
    <div className="flex gap-2 justify-center mb-4">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() =>
            dispatch({ type: "SET_FILTER", payload: opt })
          }
          className={`px-3 py-1 rounded border ${
            filter === opt ? "bg-black text-white" : ""
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}