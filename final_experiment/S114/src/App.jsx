import { useEffect, useMemo, useState } from "react";

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
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

  // Toggle task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Clear completed
  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    if (filter === FILTERS.ACTIVE)
      return tasks.filter((t) => !t.completed);

    if (filter === FILTERS.COMPLETED)
      return tasks.filter((t) => t.completed);

    return tasks;
  }, [tasks, filter]);

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Todo App
        </h1>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="flex-1 border p-2 rounded"
            placeholder="Enter task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between mt-4 text-sm">
          <div className="flex gap-2">
            {Object.values(FILTERS).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 rounded ${
                  filter === f
                    ? "bg-black text-white"
                    : "bg-gray-200"
                }`}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={clearCompleted}
            className="text-red-500"
          >
            Clear Completed
          </button>
        </div>

        {/* Task list */}
        <div className="mt-4 space-y-2">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500 mt-6">
              No tasks found
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span
                    className={
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }
                  >
                    {task.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 text-sm text-gray-600 flex justify-between">
          <span>{activeCount} tasks remaining</span>
          <span>Total: {tasks.length}</span>
        </div>
      </div>
    </div>
  );
}