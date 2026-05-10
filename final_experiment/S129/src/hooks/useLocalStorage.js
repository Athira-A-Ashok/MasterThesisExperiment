import { useEffect } from "react";

export const useLocalStorage = (key, state) => {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
};