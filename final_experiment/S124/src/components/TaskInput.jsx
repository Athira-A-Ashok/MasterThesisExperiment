import { useState } from "react";

export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <div>
      <input
        value={value}
        placeholder="Add a task..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}