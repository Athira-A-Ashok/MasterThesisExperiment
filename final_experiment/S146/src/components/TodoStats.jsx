import React, { useMemo } from "react";
import { useTodos } from "../hooks/useTodos";

export default function TodoStats() {
  const { todos } = useTodos();

  const remaining = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos]
  );

  return (
    <p aria-live="polite">
      Remaining tasks: {remaining}
    </p>
  );
}