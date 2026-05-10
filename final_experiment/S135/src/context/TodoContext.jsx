import { createContext, useReducer, useContext } from "react";
import { todoReducer } from "../reducer/todoReducer";

const TodoContext = createContext(null);

const initialState = [];

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const value = {
    todos: state,
    dispatch,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodoContext must be used inside Provider");
  return context;
};