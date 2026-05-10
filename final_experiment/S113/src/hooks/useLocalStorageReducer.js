// src/hooks/useLocalStorageReducer.js
import { useEffect, useReducer } from "react";

export const useLocalStorageReducer = (reducer, initialState, key) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      dispatch({ type: "init", payload: JSON.parse(stored) });
    }
  }, [key]);

  // Save
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state.tasks));
  }, [state, key]);

  return [state, dispatch];
};