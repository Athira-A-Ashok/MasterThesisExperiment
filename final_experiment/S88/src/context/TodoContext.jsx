import React, { createContext, useContext, useEffect, useReducer } from "react";

const TodoContext = createContext();

const initialState = {
  todos: [],
  filter: "all",
};

function safeLoad() {
  try {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, todos: action.payload };

    case "ADD":
      return { ...state, todos: [action.payload, ...state.todos] };

    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        ),
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.id),
      };

    case "SET_FILTER":
      return { ...state, filter: action.filter };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((t) => !t.completed),
      };

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "INIT", payload: safeLoad() });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    } catch {
      console.error("Failed to save todos");
    }
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export const useTodo = () => useContext(TodoContext);