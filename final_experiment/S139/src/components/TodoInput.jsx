import { useState } from "react";

export const TodoInput = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const text = value.trim();
    if (!text) return;
    onAdd(text);
    setValue("");
  };

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};