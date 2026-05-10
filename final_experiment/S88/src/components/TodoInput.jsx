import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import styles from "../styles/TodoInput.module.css";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { dispatch } = useTodo();

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
      },
    });

    setText("");
  };

  return (
    <div className={styles.wrapper}>
      <input
        value={text}
        placeholder="What needs to be done?"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}