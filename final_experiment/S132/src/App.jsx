import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";

export default function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    activeCount,
    inputRef,
  } = useTodos();

  const [filter, setFilter] = useState("all");

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <main>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} inputRef={inputRef} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        activeCount={activeCount}
      />
    </main>
  );
}