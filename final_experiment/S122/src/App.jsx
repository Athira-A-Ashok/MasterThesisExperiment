import useTodos from "./hooks/useTodos";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoFooter from "./components/TodoFooter";

export default function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filter,
    setFilter,
    activeCount,
    hasCompleted,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

        <TodoInput addTodo={addTodo} />

        <TodoFilter filter={filter} setFilter={setFilter} />

        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />

        <TodoFooter
          activeCount={activeCount}
          clearCompleted={clearCompleted}
          hasCompleted={hasCompleted}
        />
      </div>
    </div>
  );
}