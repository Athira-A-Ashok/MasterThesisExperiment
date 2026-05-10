import { useState, useMemo } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos([
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
      },
      ...todos,
    ]);

    setText("");
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-700">
          Todo App
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a task..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {["all", "active", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filter === f
                    ? "bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <span className="text-sm text-slate-500">
            {activeCount} left
          </span>
        </div>

        {/* Todo List */}
        <div className="space-y-2 max-h-96 overflow-auto">
          {filteredTodos.length === 0 ? (
            <p className="text-center text-slate-400 py-6">
              No tasks
            </p>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4"
                  />
                  <span
                    className={`${
                      todo.completed
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.some((t) => t.completed) && (
          <button
            onClick={clearCompleted}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
          >
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}