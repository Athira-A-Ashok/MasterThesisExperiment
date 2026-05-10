import { useEffect, useReducer, useMemo, useState, useCallback } from "react";
import { taskReducer, initialState } from "./reducer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const LOCAL_KEY = "tasks_app";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [filter, setFilter] = useState("ALL");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      dispatch({ type: "SET_STATE", payload: JSON.parse(saved) });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
  }, [state]);

  const addTask = useCallback((text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_TASK", payload: newTask });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const toggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "ACTIVE":
        return state.tasks.filter((t) => !t.completed);
      case "COMPLETED":
        return state.tasks.filter((t) => t.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, filter]);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Todo App</h2>

      <TaskForm addTask={addTask} />

      {/* Filter Buttons */}
      <div style={{ margin: "10px 0" }}>
        {["ALL", "ACTIVE", "COMPLETED"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />

      <p>{state.tasks.filter((t) => !t.completed).length} items left</p>
    </div>
  );
}