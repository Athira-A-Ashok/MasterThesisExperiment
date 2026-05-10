import { useReducer, useEffect } from "react";
import { todoReducer } from "../utils/todoReducer";
import { ACTIONS } from "../utils/actionTypes";

const STORAGE_KEY = "todos";

export const useTodosReducer = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // initialize from localStorage
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(data)) {
        dispatch({ type: ACTIONS.INIT, payload: data });
      }
    } catch {
      dispatch({ type: ACTIONS.INIT, payload: [] });
    }
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  return { todos, dispatch };
};