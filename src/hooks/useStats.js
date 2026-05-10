import { useMemo } from "react";

export function useStats(todos) {
  return useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;

    return {
      total,
      completed,
      active,
    };
  }, [todos]);
}