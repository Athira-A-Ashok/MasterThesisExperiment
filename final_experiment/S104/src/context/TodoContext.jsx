import { createContext, useReducer, useEffect } from "react";

export const TodoContext = createContext();

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  filter: "ALL",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: [
          {
            id: crypto.randomUUID(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString(),
          },
          ...state.todos,
        ],
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      };

    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(t => !t.completed),
      };

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}