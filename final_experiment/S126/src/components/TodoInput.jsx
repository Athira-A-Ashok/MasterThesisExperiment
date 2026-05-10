import { useState, useRef, useCallback } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoInput() {
  const { dispatch } = useTodos();
  const [text, setText] = useState("");
  const inputRef = useRef();

  const addTask = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({ type: "ADD_TASK", payload: trimmed });
    setText("");
    inputRef.current.focus();
  }, [text, dispatch]);

  return (
    <div className="input-wrapper">
      <input
        ref={inputRef}
        value={text}
        placeholder="Add a task..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTask()}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}