import { useState, useCallback, useMemo } from "react";

/**
 * Todo Item Component (memoized to prevent unnecessary re-renders)
 */
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 ring-indigo-500"
    >
      {/* Checkbox + Text */}
      <label className="flex items-center gap-3 cursor-pointer w-full">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-5 w-5 accent-indigo-600 cursor-pointer"
        />

        <span
          className={`text-sm md:text-base transition-all ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800 dark:text-gray-100"
          }`}
        >
          {todo.text}
        </span>
      </label>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(todo.id)}
        aria-label="Delete task"
        className="ml-4 text-gray-400 hover:text-red-500 transition"
      >
        🗑️
      </button>
    </li>
  );
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  /**
   * Add Task
   */
  const addTodo = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  }, [input]);

  /**
   * Handle Enter Key
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  /**
   * Toggle Completion
   */
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }, []);

  /**
   * Delete Task
   */
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Derived State (optimized)
   */
  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Todo App
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <label htmlFor="todo-input" className="sr-only">
            Add new task
          </label>

          <input
            id="todo-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 ring-indigo-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />

          <button
            onClick={addTodo}
            className="px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition focus:outline-none focus:ring-2 ring-indigo-500"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        {todos.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg">No tasks yet</p>
            <p className="text-sm">Add a task to get started</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            {remainingCount} task{remainingCount !== 1 && "s"} left
          </div>
        )}
      </div>
    </main>
  );
}