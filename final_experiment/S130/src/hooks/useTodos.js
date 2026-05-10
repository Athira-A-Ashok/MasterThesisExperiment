import { useContext, useMemo, useState, useCallback } from "react";
import { TodoContext } from "../context/TodoProvider";

export function useTodos() {
  const { todos, dispatch, ACTIONS } = useContext(TodoContext);
  const [filter, setFilter] = useState("all");

  const addTodo = useCallback(
    (text) => dispatch({ type: ACTIONS.ADD, payload: text }),
    [dispatch]
  );

  const toggleTodo = useCallback(
    (id) => dispatch({ type: ACTIONS.TOGGLE, payload: id }),
    [dispatch]
  );

  const deleteTodo = useCallback(
    (id) => dispatch({ type: ACTIONS.DELETE, payload: id }),
    [dispatch]
  );

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "completed") return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const remaining = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  );

  return {
    todos: filteredTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filter,
    setFilter,
    remaining,
  };
}