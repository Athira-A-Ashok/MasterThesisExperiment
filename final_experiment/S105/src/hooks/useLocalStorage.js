import { useEffect } from "react";

export function useLocalStorage(key, state) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
}