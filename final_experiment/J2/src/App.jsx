import { useEffect, useState } from "react";

const priorities = ["Low", "Medium", "High"];

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [draggedIndex, setDraggedIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        priority: "Medium",
        editing: false,
      },
    ]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const updateText = (id, newText) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  const toggleEdit = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, editing: !t.editing } : t
      )
    );
  };

  const changePriority = (id, priority) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, priority } : t))
    );
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // Drag handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDrop = (index) => {
    const updated = [...todos];
    const draggedItem = updated[draggedIndex];
    updated.splice(draggedIndex, 1);
    updated.splice(index, 0, draggedItem);
    setTodos(updated);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="border p-2 flex-1"
          placeholder="Add a task"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4">
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={todo.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(index)}
            className="border p-2 mb-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              {todo.editing ? (
                <input
                  value={todo.text}
                  onChange={(e) => updateText(todo.id, e.target.value)}
                  className="border px-1"
                />
              ) : (
                <span
                  className={`flex-1 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.text}
                </span>
              )}

              <select
                value={todo.priority}
                onChange={(e) => changePriority(todo.id, e.target.value)}
                className="border"
              >
                {priorities.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 ml-2">
              <button onClick={() => toggleEdit(todo.id)}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-sm">
        {todos.filter((t) => !t.completed).length} items left
      </div>
    </div>
  );
}

export default App;
