import { useState } from "react";
import { useTodos } from "./hooks/useTodos";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import TodoFooter from "./components/TodoFooter";
import { FILTERS } from "./utils/filters";

export default function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    remaining,
  } = useTodos();

  const [filter, setFilter] = useState(FILTERS.ALL);

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <TodoList
        todos={todos}
        filter={filter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <TodoFilters filter={filter} setFilter={setFilter} />

      <TodoFooter
        remaining={remaining}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}