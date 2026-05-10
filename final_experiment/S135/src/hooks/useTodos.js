import { useMemo, useCallback } from "react";
import { useTodoContext } from "../context/TodoContext";

export const useTodos = () => {
  const { todos, dispatch } = useTodoContext();

  const addTodo = useCallback((text) => {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TODO", payload: text });
  }, [dispatch]);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  }, [dispatch]);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, [dispatch]);

  const activeTodos = useMemo(
    () => todos.filter((t) => !t.completed),
    [todos]
  );

  const completedTodos = useMemo(
    () => todos.filter((t) => t.completed),
    [todos]
  );

  return {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
  };
};