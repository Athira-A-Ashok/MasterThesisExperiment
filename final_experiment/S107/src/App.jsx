import { useCallback, useMemo, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTodosReducer } from "./hooks/useTodosReducer";

export default function App() {
  const [storedTasks, setStoredTasks] = useLocalStorage("todos", []);
  const { state: tasks, dispatch } = useTodosReducer(storedTasks);

  const [filter, setFilter] = useState("ALL");

  // sync reducer -> localStorage
  const syncStorage = useCallback((newTasks) => {
    setStoredTasks(newTasks);
  }, [setStoredTasks]);

  const addTask = useCallback((text) => {
    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const newTasks = [task, ...tasks];
    dispatch({ type: "ADD", payload: task });
    syncStorage(newTasks);
  }, [tasks, dispatch, syncStorage]);

  const toggleTask = useCallback((id) => {
    const newTasks = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );

    dispatch({ type: "TOGGLE", payload: id });
    syncStorage(newTasks);
  }, [tasks, dispatch, syncStorage]);

  const deleteTask = useCallback((id) => {
    const newTasks = tasks.filter(t => t.id !== id);

    dispatch({ type: "DELETE", payload: id });
    syncStorage(newTasks);
  }, [tasks, dispatch, syncStorage]);

  // derived filtered tasks
  const filteredTasks = useMemo(() => {
    if (filter === "ACTIVE") return tasks.filter(t => !t.completed);
    if (filter === "COMPLETED") return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  const activeCount = useMemo(
    () => tasks.filter(t => !t.completed).length,
    [tasks]
  );

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTask} />

      <TodoList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />

      <TodoFooter
        count={activeCount}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}