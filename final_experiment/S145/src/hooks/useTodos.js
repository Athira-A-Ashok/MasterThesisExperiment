import { useEffect, useMemo, useReducer, useCallback } from "react";
import { todoReducer } from "../state/todoReducer";
import { initialState } from "../state/initialState";
import { todoStorage } from "../storage/todoStorage";

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState, (init) => ({
    ...init,
    todos: todoStorage.load(),
  }));

  useEffect(() => {
    todoStorage.save(state.todos);
  }, [state.todos]);

  const addTodo = useCallback((todo) => {
    dispatch({ type: "ADD", payload: todo });
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: "TOGGLE", payload: id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: "DELETE", payload: id });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: "CLEAR_COMPLETED" });
  }, []);

  const stats = useMemo(() => {
    const total = state.todos.length;
    const active = state.todos.filter((t) => !t.completed).length;
    return { total, active };
  }, [state.todos]);

  return {
    todos: state.todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    stats,
  };
}