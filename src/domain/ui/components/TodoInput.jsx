import { useState } from "react";
import { ACTIONS } from "../../state/actions";
import { createUUID } from "../../utils/uuid";
import { validateTodoText } from "../../utils/validation";

export default function TodoInput({ dispatch }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (!validateTodoText(text)) return;

    dispatch({
      type: ACTIONS.ADD_TODO,
      payload: {
        id: createUUID(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        metadata: {},
      },
    });

    setText("");
  };

  return (
    <div>
      <label htmlFor="todoInput">Add Todo</label>
      <input
        id="todoInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        aria-label="Todo input"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}