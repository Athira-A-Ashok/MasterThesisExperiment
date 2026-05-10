import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodos = () => {
  const { state, dispatch } = useContext(TodoContext);

  const addTodo = (text) => {
    if (!text.trim()) return;
    dispatch({ type: "ADD_TODO", payload: text });
  };

  const toggleTodo = (id) =>
    dispatch({ type: "TOGGLE_TODO", payload: id });

  const deleteTodo = (id) =>
    dispatch({ type: "DELETE_TODO", payload: id });

  const setFilter = (filter) =>
    dispatch({ type: "SET_FILTER", payload: filter });

  const clearCompleted = () =>
    dispatch({ type: "CLEAR_COMPLETED" });

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = state.todos.filter((t) => !t.completed).length;

  return {
    todos: filteredTodos,
    filter: state.filter,
    activeCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  };
};