import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterBar from "./components/FilterBar";
import DarkModeToggle from "./components/DarkModeToggle";

const LOCAL_KEY = "todos_app";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (saved) setTodos(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now(), completed: false }]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(t => t.id === id ? { ...t, ...updatedTodo } : t));
  };

  const deleteTodo = (id) => {
    if (window.confirm("Delete this task?")) {
      setTodos(todos.filter(t => t.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <h1>Todo App</h1>

        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <TodoForm addTodo={addTodo} />

        <FilterBar filter={filter} setFilter={setFilter} />

        <TodoList
          todos={filteredTodos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      </div>
    </div>
  );
}