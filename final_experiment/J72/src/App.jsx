import { useState } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: task }
    ]);

    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-box">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="list">
        {tasks.map((t) => (
          <li key={t.id} className="item">
            <span>{t.text}</span>

            <div className="actions">
              <button onClick={() => deleteTask(t.id)}>
                Delete
              </button>

              <span
                className="icon"
                onClick={() => deleteTask(t.id)}
                title="Remove"
              >
                ✖
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}