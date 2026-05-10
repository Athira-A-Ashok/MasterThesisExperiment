import { useContext, useCallback, useMemo } from "react";
import { TodoContext } from "../app/TodoProvider";
import { ACTIONS } from "../state/actionTypes";

export function useTodos() {
  const { state, dispatch } = useContext(TodoContext);

  const addTodo = useCallback((text) => {
    dispatch({ type: ACTIONS.ADD, payload: { text } });
  }, [dispatch]);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.DELETE, payload: { id } });
  }, [dispatch]);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id } });
  }, [dispatch]);

  const todos = state.todos;

  return useMemo(() => ({
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  }), [todos, addTodo, deleteTodo, toggleTodo]);
}