import { createContext, useContext } from "react";
import { useTodos } from "../hooks/useTodos";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const value = useTodos();
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);