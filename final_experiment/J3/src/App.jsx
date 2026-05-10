import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterSort from "./components/FilterSort";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || [];
  });

  const [sortType, setSortType] = useState("date");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, file) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
      important: false,
      pinned: false,
      createdAt: new Date().toISOString(),
      file,
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleComplete = id => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const toggleImportant = id => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, important: !t.important } : t
      )
    );
  };

  const togglePin = id => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, pinned: !t.pinned } : t
      )
    );
  };

  const deleteTodo = id => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const sortedTodos = [...todos].sort((a, b) => {
    // pinned always top
    if (a.pinned !== b.pinned) return b.pinned - a.pinned;

    if (sortType === "alpha") {
      return a.text.localeCompare(b.text);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="container">
      <h1>Advanced Todo App</h1>

      <TodoForm onAdd={addTodo} />

      <FilterSort setSortType={setSortType} />

      <TodoList
        todos={sortedTodos}
        toggleComplete={toggleComplete}
        toggleImportant={toggleImportant}
        togglePin={togglePin}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}