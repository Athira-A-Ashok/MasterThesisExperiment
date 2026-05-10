import { useState } from "react";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List</h1>

        <div className="input-box">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="list">
          {tasks.map((t) => (
            <div
              key={t.id}
              className={t.completed ? "task completed" : "task pending"}
            >
              <div className="left">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t.id)}
                />
                <span>{t.text}</span>
              </div>

              <button onClick={() => deleteTask(t.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .app {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          padding-top: 60px;
          background: #f4f6f8;
          min-height: 100vh;
        }

        .container {
          width: 400px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        h1 {
          text-align: center;
          margin-bottom: 20px;
        }

        .input-box {
          display: flex;
          gap: 10px;
        }

        input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }

        button {
          padding: 10px 12px;
          border: none;
          background: #007bff;
          color: white;
          border-radius: 6px;
          cursor: pointer;
        }

        button:hover {
          background: #0056b3;
        }

        .list {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .task {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-radius: 8px;
        }

        .pending {
          background: #fff;
          border: 1px solid #ddd;
        }

        .completed {
          background: #e6ffed;
          border: 1px solid #2ecc71;
          color: #2ecc71;
          text-decoration: line-through;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .task button {
          background: #ff4d4f;
        }

        .task button:hover {
          background: #d9363e;
        }
      `}</style>
    </div>
  );
}
