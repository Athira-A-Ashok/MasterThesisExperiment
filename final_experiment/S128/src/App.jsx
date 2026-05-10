import { useTodos } from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoFooter from "./components/TodoFooter";

export default function App() {
  const {
    todos,
    filter,
    activeCount,
    hasCompleted,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    clearCompleted,
  } = useTodos();

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded">
      <h1 className="text-xl font-bold mb-4 text-center">Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <TodoFilter filter={filter} onChange={setFilter} />

      <TodoFooter
        activeCount={activeCount}
        hasCompleted={hasCompleted}
        onClear={clearCompleted}
      />
    </div>
  );
}

