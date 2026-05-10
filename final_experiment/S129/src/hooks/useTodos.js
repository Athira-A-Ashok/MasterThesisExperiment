import { useReducer, useEffect } from "react";
import { todoReducer, initialState } from "../reducer/todoReducer";
import { useLocalStorage } from "./useLocalStorage";

export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todos"));
    if (stored) {
      dispatch({ type: "LOAD_TODOS", payload: stored });
    }
  }, []);

  // Persist
  useLocalStorage("todos", state.todos);

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = state.todos.filter(t => !t.completed).length;

  return {
    state,
    dispatch,
    filteredTodos,
    activeCount
  };
};