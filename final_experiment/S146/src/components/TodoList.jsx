import React, { useMemo, useState } from "react";
import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";
import { filterTodos, FILTERS } from "../utils/filters";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState(FILTERS.ALL);

  const visibleTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter]
  );

  return (
    <div>
      <ul role="list">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </ul>

      <div role="tablist" aria-label="Filters">
        {Object.values(FILTERS).map(f => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}