import { useEffect, useRef } from "react";

export function useLocalStorage(key, state) {
  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.warn("LocalStorage write failed:", err);
    }
  }, [key, state]);
}

export function loadState(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}