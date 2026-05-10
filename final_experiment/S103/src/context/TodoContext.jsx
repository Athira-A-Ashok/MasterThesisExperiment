import { createContext, useReducer, useEffect } from "react";

export const TodoContext = createContext();

const initialState = {
  todos: [],
  filter: "ALL"
};

// Reducer (pure)
function todoReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return { ...state, todos: action.payload };

    case "ADD":
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case "TOGGLE":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case "DELETE":
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    dispatch({ type: "INIT", payload: saved });
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}