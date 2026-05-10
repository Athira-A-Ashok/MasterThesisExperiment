import { useReducer } from "react";
import { taskReducer, initialState } from "./reducer";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo App</h2>

      <TaskForm dispatch={dispatch} />

      <TaskList tasks={state.tasks} dispatch={dispatch} />
    </div>
  );
}