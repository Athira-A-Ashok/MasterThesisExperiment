import { useEffect, useReducer, useMemo } from "react";
import { loadTodos, saveTodos } from "../utils/storage";

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const initialState = {
  todos: [],
  filter: FILTERS.ALL,
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, todos: action.payload };

    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const stored = loadTodos();
    dispatch({ type: "INIT", payload: stored });
  }, []);

  // Save to localStorage
  useEffect(() => {
    saveTodos(state.todos);
  }, [state.todos]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({
      type: "ADD_TODO",
      payload: {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
      },
    });
  };

  const toggleTodo = (id) =>
    dispatch({ type: "TOGGLE_TODO", payload: id });

  const deleteTodo = (id) =>
    dispatch({ type: "DELETE_TODO", payload: id });

  const clearCompleted = () =>
    dispatch({ type: "CLEAR_COMPLETED" });

  const setFilter = (filter) =>
    dispatch({ type: "SET_FILTER", payload: filter });

  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case FILTERS.ACTIVE:
        return state.todos.filter((t) => !t.completed);
      case FILTERS.COMPLETED:
        return state.todos.filter((t) => t.completed);
      default:
        return state.todos;
    }
  }, [state.todos, state.filter]);

  const activeCount = useMemo(
    () => state.todos.filter((t) => !t.completed).length,
    [state.todos]
  );

  return {
    todos: filteredTodos,
    rawTodos: state.todos,
    filter: state.filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
    activeCount,
    FILTERS,
  };
}