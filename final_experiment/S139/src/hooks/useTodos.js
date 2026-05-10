import { useEffect, useMemo, useState } from "react";
import { loadTodos, saveTodos } from "../utils/storage";
import { createTodo, filterTodos } from "../utils/todoUtils";

export const useTodos = () => {
  const [todos, setTodos] = useState(loadTodos());
  const [filter, setFilter] = useState("all");

  // persist
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // actions
  const addTodo = (text) => {
    setTodos((prev) => [createTodo(text), ...prev]);
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  // derived state
  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter]
  );

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  return {
    todos: filteredTodos,
    rawTodos: todos,
    filter,
    setFilter,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
    activeCount,
  };
};