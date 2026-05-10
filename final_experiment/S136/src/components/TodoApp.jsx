import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import FilterBar from "./FilterBar";
import Footer from "./Footer";
import { useTodos } from "../hooks/useTodos";

export default function TodoApp() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    remainingCount,
  } = useTodos();

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <FilterBar filter={filter} setFilter={setFilter} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <Footer remaining={remainingCount} onClear={clearCompleted} />
    </div>
  );
}