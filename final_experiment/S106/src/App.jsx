import { useMemo, useReducer, useState, useEffect } from "react";
import { todoReducer } from "./reducer/todoReducer";
import { useLocalStorage } from "./hooks/useLocalStorage";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter, { FILTERS } from "./components/TodoFilter";
import TodoFooter from "./components/TodoFooter";

export default function App() {
  const [storedTasks, setStoredTasks] = useLocalStorage("todos", []);

  const [tasks, dispatch] = useReducer(todoReducer, storedTasks);
  const [filter, setFilter] = useState(FILTERS.ALL);

  // sync reducer → localStorage
  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  // derived filtered tasks (useMemo)
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return tasks.filter((t) => !t.completed);
      case FILTERS.COMPLETED:
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // derived count (useMemo)
  const remaining = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );

  return (
    <main>
      <h1>Todo App</h1>

      <TodoInput dispatch={dispatch} />

      <TodoFilter filter={filter} setFilter={setFilter} />

      <TodoList tasks={filteredTasks} dispatch={dispatch} />

      <TodoFooter remaining={remaining} />
    </main>
  );
}