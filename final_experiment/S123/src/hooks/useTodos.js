import { useReducer, useEffect } from "react";
import { todoReducer, ACTIONS } from "../reducers/todoReducer";
import { useLocalStorage } from "./useLocalStorage";

export function useTodos() {
  const [stored, setStored] = useLocalStorage("todos", []);

  const [state, dispatch] = useReducer(todoReducer, stored);

  useEffect(() => {
    setStored(state);
  }, [state]);

  return { state, dispatch, ACTIONS };
}