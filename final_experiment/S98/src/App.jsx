import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [toast, setToast] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Toast handler
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  // Add task
  const addTask = () => {
    const text = input.trim();
    if (!text) return;

    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
    showToast("Task added successfully ✔️");
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    showToast("Task deleted 🗑️");
  };

  // Toggle complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          {toast}
        </div>
      )}

      {/* Container */}
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-4">

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a task…"
            className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-xl"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="mt-4 space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              No tasks yet. Add something 🚀
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-xl"
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5"
                  />
                  <span
                    className={`flex-1 ${
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
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 text-sm text-gray-500 flex justify-between">
          <span>{activeCount} tasks remaining</span>
          <span>Total: {tasks.length}</span>
        </div>
      </div>
    </div>
  );
}