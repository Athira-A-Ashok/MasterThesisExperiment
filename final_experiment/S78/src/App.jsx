import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  // =========================
  // STATE MANAGEMENT
  // =========================
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // =========================
  // SAVE TO LOCAL STORAGE
  // =========================
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // =========================
  // ADD TASK
  // =========================
  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      title: input,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  // =========================
  // DELETE TASK
  // =========================
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // =========================
  // TOGGLE COMPLETE
  // =========================
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // =========================
  // EDIT TASK
  // =========================
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, title: editText } : t
      )
    );
    setEditingId(null);
  };

  // =========================
  // CLEAR COMPLETED
  // =========================
  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="container">
      <div className="card">
        <h1>To-Do List</h1>

        {/* INPUT SECTION */}
        <div className="inputBox">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        {/* FILTERS */}
        <div className="filters">
          {["all", "pending", "completed"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TASK COUNTER */}
        <p className="counter">{remaining} tasks remaining</p>

        {/* TASK LIST */}
        <div className="list">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`task ${task.completed ? "done" : ""}`}
            >
              <div className="left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />

                {/* EDIT MODE */}
                {editingId === task.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="editInput"
                  />
                ) : (
                  <div>
                    <span className="title">{task.title}</span>
                    <small>{task.createdAt}</small>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="actions">
                {editingId === task.id ? (
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                ) : (
                  <button onClick={() => startEdit(task)}>Edit</button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* CLEAR COMPLETED */}
        {tasks.some((t) => t.completed) && (
          <button className="clear" onClick={clearCompleted}>
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}