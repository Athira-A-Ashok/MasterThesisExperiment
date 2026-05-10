import { createContext, useContext, useReducer, useEffect } from "react";
import { todoReducer, initialState } from "../reducer/todoReducer";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState, (init) => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : init;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}