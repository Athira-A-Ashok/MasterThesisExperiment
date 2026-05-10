import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoInput() {
  const { dispatch } = useTodos();
  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Medium");

  const addTodo = () => {
    if (!text.trim()) return;

    dispatch({
      type: "ADD",
      payload: {
        id: crypto.randomUUID(),
        text,
        completed: false,
        category,
        priority,
        createdAt: new Date().toISOString()
      }
    });

    setText("");
  };

  return (
    <div>
      <input
        value={text}
        placeholder="Add task..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && addTodo()}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option>General</option>
        <option>Work</option>
        <option>Personal</option>
      </select>

      <select onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button onClick={addTodo}>Add</button>
    </div>
  );
}