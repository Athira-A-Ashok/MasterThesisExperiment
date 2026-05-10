import React, { useState } from "react";

export default function TaskWriter({ dispatch }) {
  const [text, setText] = useState("");

  const addTask = () => {
    const clean = text.trim();
    if (!clean) return;

    dispatch({
      type: "ADD_TASK",
      payload: {
        id: crypto.randomUUID(),
        text: clean,
        completed: false,
      },
    });

    setText("");
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
        placeholder="Add to stream"
        className="flex-1 border p-2 rounded"
      />
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}