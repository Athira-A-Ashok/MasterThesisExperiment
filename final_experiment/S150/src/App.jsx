import { useReducer, useMemo } from "react";
import { reducer, initialState } from "./reducer";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskFooter from "./components/TaskFooter";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const saved = JSON.parse(localStorage.getItem("tasks-app"));

  const [state, dispatch] = useReducer(
    reducer,
    saved || initialState
  );

  useLocalStorage(state);

  const filteredTasks = useMemo(() => {
    if (state.filter === "active")
      return state.tasks.filter((t) => !t.completed);

    if (state.filter === "completed")
      return state.tasks.filter((t) => t.completed);

    return state.tasks;
  }, [state.tasks, state.filter]);

  const remaining = state.tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-5">
        
        <h1 className="text-2xl font-bold text-center mb-4">
          Todo App
        </h1>

        <TaskInput dispatch={dispatch} />

        <TaskList tasks={filteredTasks} dispatch={dispatch} />

        <TaskFooter
          remaining={remaining}
          filter={state.filter}
          dispatch={dispatch}
          hasCompleted={state.tasks.some((t) => t.completed)}
        />
      </div>
    </div>
  );
}