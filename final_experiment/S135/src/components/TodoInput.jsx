import { useState, useCallback } from "react";

const TodoInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = useCallback(() => {
    onAdd(text);
    setText("");
  }, [text, onAdd]);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Add task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoInput;