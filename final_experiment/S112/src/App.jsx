import React, { useReducer, useCallback, useMemo, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const initialState = {
  tasks: [],
  filter: "ALL", // ALL | ACTIVE | COMPLETED
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: crypto.randomUUID(),
            text: action.payload,
            completed: false,
            createdAt: Date.now(),
          },
        ],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: "ADD_TASK", payload: trimmed });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const setFilter = useCallback((filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case "ACTIVE":
        return state.tasks.filter((t) => !t.completed);
      case "COMPLETED":
        return state.tasks.filter((t) => t.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>Optimized Todo App</h2>

      <TaskForm onAdd={addTask} />

      <div style={{ margin: "10px 0" }}>
        {["ALL", "ACTIVE", "COMPLETED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              marginRight: 8,
              fontWeight: state.filter === f ? "bold" : "normal",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />

      <p>
        Remaining: {state.tasks.filter((t) => !t.completed).length}
      </p>
    </div>
  );
}