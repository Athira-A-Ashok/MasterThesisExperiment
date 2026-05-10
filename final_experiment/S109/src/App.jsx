// src/App.jsx
import { useReducer } from "react";
import { taskReducer, initialState } from "./state/taskReducer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h1>Todo App</h1>

      <TaskForm dispatch={dispatch} />

      {/* Filter Buttons */}
      <div style={{ margin: "10px 0" }}>
        {["ALL", "ACTIVE", "COMPLETED"].map(f => (
          <button
            key={f}
            onClick={() =>
              dispatch({ type: "SET_FILTER", payload: f })
            }
            aria-label={`Filter ${f}`}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={state.tasks}
        filter={state.filter}
        dispatch={dispatch}
      />

      <p>
        Remaining: {state.tasks.filter(t => !t.completed).length}
      </p>
    </div>
  );
}