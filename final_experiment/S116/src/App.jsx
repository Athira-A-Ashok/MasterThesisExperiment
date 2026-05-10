import { useReducer, useMemo, useState, useCallback } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import React from "react";

/* ---------------- Reducer ---------------- */

const ACTIONS = {
  ADD: "add",
  TOGGLE: "toggle",
  DELETE: "delete",
  INIT: "init",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];

    case ACTIONS.TOGGLE:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    case ACTIONS.DELETE:
      return state.filter((task) => task.id !== action.payload);

    case ACTIONS.INIT:
      return action.payload;

    default:
      return state;
  }
}

/* ---------------- Components ---------------- */

const TaskItem = React.memo(({ task, onToggle, onDelete }) => {
  return (
    <li style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          flex: 1,
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>🗑</button>
    </li>
  );
});

/* ---------------- App ---------------- */

export default function App() {
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
  const [tasks, dispatch] = useReducer(reducer, storedTasks);

  const [filter, setFilter] = useState("ALL");
  const [input, setInput] = useState("");

  /* Sync reducer → localStorage */
  React.useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  /* ---------------- Actions ---------------- */

  const addTask = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    });

    setInput("");
  }, [input]);

  const toggleTask = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  /* ---------------- Derived State (NO extra storage) ---------------- */

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "ACTIVE":
        return tasks.filter((t) => !t.completed);
      case "COMPLETED":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const activeCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  /* ---------------- UI ---------------- */

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Todo App</h2>

      {/* Input */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add task..."
          style={{ flex: 1 }}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Filters */}
      <div style={{ marginTop: "15px" }}>
        {["ALL", "ACTIVE", "COMPLETED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: "5px",
              fontWeight: filter === f ? "bold" : "normal",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Active Count */}
      <p style={{ marginTop: "10px" }}>
        Active tasks: <strong>{activeCount}</strong>
      </p>

      {/* Task List */}
      <ul style={{ padding: 0, marginTop: "15px", listStyle: "none" }}>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}