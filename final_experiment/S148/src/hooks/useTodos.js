// hooks/useTodos.js

import { useEffect, useReducer } from "react";
import { todoReducer } from "../state/todoReducer";
import { initialState } from "../state/initialState";
import { TODO_ACTIONS } from "../state/todoActions";
import { todoStorage } from "../storage/todoStorage";

export function useTodos() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load initial data
  useEffect(() => {
    const stored = todoStorage.load();
    dispatch({
      type: TODO_ACTIONS.SET_TODOS,
      payload: stored,
    });
  }, []);

  // Persist changes
  useEffect(() => {
    todoStorage.save(state.todos);
  }, [state.todos]);

  // Action wrappers (future backend-safe layer)
  const addTodo = (todo) =>
    dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: todo });

  const toggleTodo = (id) =>
    dispatch({ type: TODO_ACTIONS.TOGGLE_TODO, payload: id });

  const deleteTodo = (id) =>
    dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: id });

  const clearCompleted = () =>
    dispatch({ type: TODO_ACTIONS.CLEAR_COMPLETED });

  return {
    todos: state.todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  };
}