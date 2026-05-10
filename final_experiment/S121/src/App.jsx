import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(FILTERS.ALL);
  const inputRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;

    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setInput("");

    // keep focus
    inputRef.current?.focus();
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
    if (filter === FILTERS.ACTIVE)
      return tasks.filter((t) => !t.completed);
    if (filter === FILTERS.COMPLETED)
      return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  const remaining = tasks.filter((t) => !t.completed).length;
  const hasCompleted = tasks.some((t) => t.completed);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-4 flex flex-col gap-4">

        {/* Input */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Type a task and press Enter"
            className="flex-1 border p-2 rounded-md outline-none"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 rounded-md"
          >
            Submit
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col gap-2">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-400 text-center py-6">
              No tasks to show
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 font-bold px-2"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t pt-3">
          <div className="text-sm text-gray-600">
            {remaining} tasks left
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {Object.values(FILTERS).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  filter === f
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Clear completed */}
          {hasCompleted && (
            <button
              onClick={clearCompleted}
              className="text-red-500 text-sm self-start"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}