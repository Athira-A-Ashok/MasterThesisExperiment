import { useEffect, useReducer, useState } from "react";
import { todoReducer, initialState } from "./reducer";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const STORAGE_KEY = "todos_app";

export default function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [filter, setFilter] = useState("all");

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      dispatch({ type: "INIT", payload: JSON.parse(saved) });
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  const activeCount = state.todos.filter(t => !t.completed).length;

  return (
    <div className="app">
      <h1>Todo App</h1>

      <TodoInput dispatch={dispatch} />

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <p>{activeCount} tasks remaining</p>

      <TodoList
        todos={state.todos}
        dispatch={dispatch}
        filter={filter}
      />

      <button
        onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
      >
        Clear Completed
      </button>
    </div>
  );
}