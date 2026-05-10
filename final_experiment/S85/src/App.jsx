import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add Task
  const addTask = () => {
    const trimmed = input.trim();

    if (!trimmed) return; // ignore empty input

    const newTask = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInput("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle Complete
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Enter key handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const remainingTasks = tasks.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">
        
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Todo List
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400 py-6">
              No tasks yet — add one above!
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 cursor-pointer"
                  />

                  {/* Text */}
                  <span
                    className={`text-sm ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-400 hover:text-red-600 transition text-lg"
                >
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {tasks.length > 0 && (
          <div className="mt-6 text-sm text-gray-500 text-center">
            {remainingTasks} task{remainingTasks !== 1 && "s"} left
          </div>
        )}
      </div>
    </div>
  );
}