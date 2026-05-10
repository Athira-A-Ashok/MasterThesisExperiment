import { createContext, useReducer, useEffect } from "react";
import { todoReducer, initialState } from "../reducer/todoReducer";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      dispatch({ type: "INIT", payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}