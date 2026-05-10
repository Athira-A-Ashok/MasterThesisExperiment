import { useEffect, useState, useRef } from "react";

const EMPTY_STATE_ICON = (
  <svg
    className="w-24 h-24 text-gray-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeWidth="1.5"
      d="M9 12h6m-6 4h6M7 8h10M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
      },
      ...prev,
    ]);

    setText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
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

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Todo List
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Add task input"
            placeholder="Add a task..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Add
          </button>
        </div>

        {/* Counter */}
        <div className="text-sm text-gray-500 mb-3">
          {activeCount} tasks left
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center py-10 text-gray-400">
            {EMPTY_STATE_ICON}
            <p className="mt-2">No tasks yet. Add one above.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Mark ${task.text} as completed`}
                    className="w-4 h-4"
                  />

                  <span
                    className={`text-sm flex-1 ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label="Delete task"
                  className="text-red-500 hover:text-red-600 focus:outline-none"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}