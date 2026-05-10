import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { dispatch } = useTodoContext();

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({ type: "ADD_TODO", payload: trimmed });
    setText("");
  };

  return (
    <div>
      <input
        aria-label="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && addTodo()}
      />
      <button aria-label="Add task button" onClick={addTodo}>
        Add
      </button>
    </div>
  );
}