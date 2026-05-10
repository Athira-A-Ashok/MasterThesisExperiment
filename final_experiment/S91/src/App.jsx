import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
} from "./features/todoSlice";

export default function App() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const { items, filter } = useSelector(state => state.todos);

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    dispatch(addTodo(text));
    setInput("");
  };

  const filteredTodos = items.filter(todo => {
    if (filter === "ACTIVE") return !todo.completed;
    if (filter === "COMPLETED") return todo.completed;
    return true;
  });

  const remaining = items.filter(t => !t.completed).length;

  return (
    <div style={styles.container}>
      <h1>Redux Todo App</h1>

      {/* Input */}
      <div style={styles.inputBox}>
        <input
          value={input}
          placeholder="Add task..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          style={styles.input}
        />
        <button onClick={handleAdd} style={styles.button}>
          Add
        </button>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        {["ALL", "ACTIVE", "COMPLETED"].map(type => (
          <button
            key={type}
            onClick={() => dispatch(setFilter(type))}
            style={{
              ...styles.filterBtn,
              background: filter === type ? "#333" : "#eee",
              color: filter === type ? "#fff" : "#000",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul style={styles.list}>
        {filteredTodos.map(todo => (
          <li key={todo.id} style={styles.item}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />

            <span
              style={{
                ...styles.text,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "#000",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              style={styles.delete}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <p>{remaining} items left</p>
    </div>
  );
}

/* Simple inline styles */
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    fontFamily: "Arial",
    textAlign: "center",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  input: {
    padding: "10px",
    width: "70%",
  },
  button: {
    padding: "10px",
    cursor: "pointer",
  },
  filters: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  filterBtn: {
    padding: "6px 12px",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    borderBottom: "1px solid #ddd",
  },
  text: {
    flex: 1,
    marginLeft: "10px",
    textAlign: "left",
  },
  delete: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
};