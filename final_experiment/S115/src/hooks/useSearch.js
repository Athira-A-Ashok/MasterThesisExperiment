import { useState, useEffect, useRef } from "react";

export function useSearch(delay = 300) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setDebounced(query);
    }, delay);

    return () => clearTimeout(timer.current);
  }, [query, delay]);

  return { query, setQuery, debounced };
}