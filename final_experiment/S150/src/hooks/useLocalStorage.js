import { useEffect } from "react";

export function useLocalStorage(state) {
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);
}