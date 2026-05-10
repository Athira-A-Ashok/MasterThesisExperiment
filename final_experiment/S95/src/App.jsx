import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add task
  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  // Toggle completed
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Todo List
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Task Count */}
        <p className="text-sm text-gray-600 mb-3">
          {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
        </p>

        {/* Empty State */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No tasks yet. Add something ✨
          </p>
        )}

        {/* Task List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
            >
              {/* Left - Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-4 h-4"
              />

              {/* Middle - Text */}
              <span
                className={`flex-1 mx-3 text-sm sm:text-base ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </span>

              {/* Right - Delete */}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-lg"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}