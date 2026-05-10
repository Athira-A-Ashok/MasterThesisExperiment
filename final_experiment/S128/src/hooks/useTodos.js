import { useEffect, useReducer } from "react";

const initialState = {
  todos: [],
  filter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, todos: action.payload };

    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem("todos");
    if (stored) {
      dispatch({ type: "INIT", payload: JSON.parse(stored) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    dispatch({ type: "ADD_TODO", payload: trimmed });
  };

  const toggleTodo = (id) => dispatch({ type: "TOGGLE_TODO", payload: id });
  const deleteTodo = (id) => dispatch({ type: "DELETE_TODO", payload: id });
  const setFilter = (filter) => dispatch({ type: "SET_FILTER", payload: filter });
  const clearCompleted = () => dispatch({ type: "CLEAR_COMPLETED" });

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = state.todos.filter((t) => !t.completed).length;
  const hasCompleted = state.todos.some((t) => t.completed);

  return {
    todos: filteredTodos,
    filter: state.filter,
    activeCount,
    hasCompleted,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  };
}
