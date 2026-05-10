import { useTodoApp } from "../hooks/useTodoApp";

export default function TodoApp() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
    query,
    setQuery,
    stats,
  } = useTodoApp();

  return (
    <div>
      <h1>Advanced Todo</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      <TodoInput onAdd={addTodo} />

      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <button onClick={clearCompleted}>Clear Completed</button>

      <TodoStats stats={stats} />
    </div>
  );
}