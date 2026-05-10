import { useState, useEffect } from "react";

export function useSearch(delay = 300) {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQuery(input), delay);
    return () => clearTimeout(t);
  }, [input]);

  return { input, setInput, query };
}