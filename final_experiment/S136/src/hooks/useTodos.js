import { useReducer, useEffect, useMemo, useCallback, useState } from "react";
import { todoReducer, ACTIONS } from "../reducer/todoReducer";
import { loadTodos, saveTodos } from "../utils/storage";

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, [], loadTodos);
  const [filter, setFilter] = useState("all");

  // persist
  useEffect(() => {
    saveTodos(state);
  }, [state]);

  // actions (stable callbacks)
  const addTodo = useCallback((text) => {
    dispatch({ type: ACTIONS.ADD, payload: text });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  }, []);

  // filtered view (optimized)
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return state.filter((t) => !t.completed);
      case "completed":
        return state.filter((t) => t.completed);
      default:
        return state;
    }
  }, [state, filter]);

  const remainingCount = useMemo(
    () => state.filter((t) => !t.completed).length,
    [state]
  );

  return {
    todos: filteredTodos,
    rawTodos: state,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    remainingCount,
  };
}