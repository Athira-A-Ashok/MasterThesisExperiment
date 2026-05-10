import { useTodos } from "./hooks/useTodos";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { TodoFilters } from "./components/TodoFilters";
import { TodoStats } from "./components/TodoStats";

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
    activeCount,
  } = useTodos();

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <TodoStats count={activeCount} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={removeTodo}
      />

      <TodoFilters
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}