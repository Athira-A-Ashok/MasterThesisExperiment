import { useMemo, useState } from "react";

export function useFilter(todos) {
  const [filter, setFilter] = useState("all"); 
  // all | active | completed

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return { filter, setFilter, filteredTodos };
}