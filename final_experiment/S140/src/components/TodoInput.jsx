import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    onAdd(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="flex-1 border p-2 rounded"
        placeholder="Enter your task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}