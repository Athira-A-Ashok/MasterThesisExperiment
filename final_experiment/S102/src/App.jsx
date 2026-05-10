import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  // Load tasks from localStorage initially
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  const [filter, setFilter] = useState("all");

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const addTask = (text) => {
    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  // Toggle completion
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

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Remaining tasks count
  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app-container">
      <h1>Todo App</h1>

      {/* Input component */}
      <TaskInput addTask={addTask} />

      {/* Filter buttons */}
      <div className="filters">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "active" : ""}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task list */}
      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      {/* Footer */}
      <div className="footer">
        <span>{remaining} tasks left</span>

        <button
          onClick={() =>
            setTasks(tasks.filter((task) => !task.completed))
          }
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;