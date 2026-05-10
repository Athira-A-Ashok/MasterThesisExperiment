import React, { useMemo } from "react";
import TodoItem from "./TodoItem";
import { FILTERS } from "../utils/filters";

function TodoList({ todos, filter, ...actions }) {
  const filtered = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return todos.filter(t => !t.completed);
      case FILTERS.COMPLETED:
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <ul>
      {filtered.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...actions} />
      ))}
    </ul>
  );
}

export default React.memo(TodoList);