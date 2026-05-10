import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a task..."
        style={{ flex: 1, padding: "8px" }}
      />
      <button type="submit">Add</button>
    </form>
  );
}