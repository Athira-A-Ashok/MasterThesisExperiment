import { useState } from "react";

function TodoInput({ dispatch }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    const trimmed = text.trim();

    if (!trimmed) return; // prevent empty input

    dispatch({
      type: "ADD_TODO",
      payload: {
        id: Date.now(),
        text: trimmed,
        completed: false,
      },
    });

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="input-box">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default TodoInput;