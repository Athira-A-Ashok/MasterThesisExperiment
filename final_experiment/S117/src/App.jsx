import { useEffect, useReducer, useCallback, useMemo, useState } from "react";
import { taskReducer, initialState, ACTIONS } from "./reducer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const FILTERS = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED"
};

export default function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [filter, setFilter] = useState(FILTERS.ALL);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      dispatch({
        type: ACTIONS.SET_TASKS,
        payload: JSON.parse(saved)
      });
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Add task
  const addTask = useCallback((text) => {
    dispatch({
      type: ACTIONS.ADD_TASK,
      payload: {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now()
      }
    });
  }, []);

  // Toggle task
  const toggleTask = useCallback((id) => {
    dispatch({
      type: ACTIONS.TOGGLE_TASK,
      payload: id
    });
  }, []);

  // Delete task
  const deleteTask = useCallback((id) => {
    dispatch({
      type: ACTIONS.DELETE_TASK,
      payload: id
    });
  }, []);

  // Memoized filtering (NO derived state stored)
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return state.tasks.filter(t => !t.completed);
      case FILTERS.COMPLETED:
        return state.tasks.filter(t => t.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, filter]);

  return (
    <div>
      <h1>Todo App</h1>

      <TaskForm onAdd={addTask} />

      {/* Filters */}
      <div>
        {Object.values(FILTERS).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {f}
          </button>
        ))}
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  );
}