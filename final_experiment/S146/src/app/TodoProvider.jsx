import React, { createContext, useReducer } from "react";
import { todoReducer, initialState } from "../state/todoReducer";

export const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}