import { useEffect, useMemo, useState } from "react";

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  DONE: "done",
};

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;

    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInput("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return tasks.filter((t) => !t.completed);
      case FILTERS.DONE:
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const remaining = tasks.filter((t) => !t.completed).length;
  const hasCompleted = tasks.some((t) => t.completed);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col gap-4">

        {/* Input Section */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-2">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              No tasks found
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4"
                />

                {/* Text */}
                <span
                  className={`flex-1 mx-3 ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.text}
                </span>

                {/* Delete */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 border-t">

          {/* Counter */}
          <p className="text-sm text-gray-600">
            {remaining} tasks remaining
          </p>

          {/* Filters */}
          <div className="flex gap-2">
            {Object.values(FILTERS).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-sm transition ${
                  filter === f
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Clear completed */}
          {hasCompleted && (
            <button
              onClick={clearCompleted}
              className="text-sm text-red-500 hover:text-red-700 transition"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}