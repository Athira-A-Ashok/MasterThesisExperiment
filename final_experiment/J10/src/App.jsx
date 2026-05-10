import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Add Task
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  };

  // Select Task
  const selectTask = (index) => {
    setSelectedIndex(index);
    setInput(tasks[index]);
  };

  // Update Task
  const updateTask = () => {
    if (selectedIndex === null) return;

    const updatedTasks = [...tasks];
    updatedTasks[selectedIndex] = input;
    setTasks(updatedTasks);

    setInput("");
    setSelectedIndex(null);
  };

  // Delete Task
  const deleteTask = () => {
    if (selectedIndex === null) return;

    const updatedTasks = tasks.filter(
      (_, index) => index !== selectedIndex
    );

    setTasks(updatedTasks);
    setInput("");
    setSelectedIndex(null);
  };

  return (
    <div className="container">
      <h2>Todo App</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="blue-btn" onClick={addTask}>
          Add
        </button>
        <button className="blue-btn" onClick={updateTask}>
          Update
        </button>
        <button className="blue-btn delete" onClick={deleteTask}>
          Delete
        </button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={selectedIndex === index ? "selected" : ""}
            onClick={() => selectTask(index)}
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;