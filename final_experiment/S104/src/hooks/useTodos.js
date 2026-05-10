import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export function useTodos() {
  const { state, dispatch } = useContext(TodoContext);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: "ADD", payload: trimmed });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE", payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  const clearCompleted = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  return {
    todos: state.todos,
    filter: state.filter,
    addTodo,
    deleteTodo,
    toggleTodo,
    setFilter,
    clearCompleted,
  };
}