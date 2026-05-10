import { useReducer, useState, useMemo } from "react";
import { todoReducer, initialState } from "./todoReducer";
import { useLocalStorage } from "./hooks/useLocalStorage";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  const [tasks, dispatch] = useReducer(todoReducer, initialState);
  const [filter, setFilter] = useState("ALL");

  useLocalStorage("tasks", tasks);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "ACTIVE":
        return tasks.filter(t => !t.completed);
      case "COMPLETED":
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const addTask = (text) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Todo App</h2>

      <TodoInput addTask={addTask} />

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setFilter("ALL")}>All</button>
        <button onClick={() => setFilter("ACTIVE")}>Active</button>
        <button onClick={() => setFilter("COMPLETED")}>Completed</button>
      </div>

      <TodoList tasks={filteredTasks} dispatch={dispatch} />

      <p>
        Remaining: {tasks.filter(t => !t.completed).length}
      </p>
    </div>
  );
}