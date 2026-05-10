// src/App.jsx
import React, { useCallback, useMemo, useState } from "react";
import { reducer, initialState, ACTIONS } from "./reducer";
import { useLocalStorageReducer } from "./hooks/useLocalStorageReducer";
import { generateUUID } from "./utils/uuid";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [state, dispatch] = useLocalStorageReducer(
    reducer,
    initialState,
    "tasks"
  );

  const [filter, setFilter] = useState("all");

  const handleAdd = useCallback((text) => {
    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: generateUUID(),
        text,
        completed: false,
        createdAt: Date.now()
      }
    });
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, [dispatch]);

  const handleToggle = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  }, [dispatch]);

  const taskCount = useMemo(() => {
    return {
      total: state.tasks.length,
      completed: state.tasks.filter(t => t.completed).length
    };
  }, [state.tasks]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>

      <TaskForm onAdd={handleAdd} />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <p>
        Total: {taskCount.total} | Completed: {taskCount.completed}
      </p>

      <TaskList
        tasks={state.tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        filter={filter}
      />
    </div>
  );
}