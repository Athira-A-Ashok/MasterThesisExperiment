import { useEffect, useReducer, useMemo } from "react";
import { todoReducer, ACTIONS } from "../reducer/todoReducer";

const STORAGE_KEY = "todos";

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // load once
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(data)) {
        dispatch({ type: ACTIONS.INIT, payload: data });
      }
    } catch {
      dispatch({ type: ACTIONS.INIT, payload: [] });
    }
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = text => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: ACTIONS.ADD,
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      },
    });
  };

  const toggleTodo = id =>
    dispatch({ type: ACTIONS.TOGGLE, payload: id });

  const deleteTodo = id =>
    dispatch({ type: ACTIONS.DELETE, payload: id });

  const clearCompleted = () =>
    dispatch({ type: ACTIONS.CLEAR });

  const remaining = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos]
  );

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    remaining,
  };
}