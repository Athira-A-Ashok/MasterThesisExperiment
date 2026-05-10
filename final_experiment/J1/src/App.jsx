import { useEffect, useState, useCallback } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const STORAGE_KEY = "todos_v1";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // Persist todos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const addTodo = useCallback((text) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  }, []);

  // Delete Todo
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  // Toggle Complete
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          if (!todo.completed) {
            toast.success("Task completed 🎉");
          }
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }, []);

  return (
    <div className="app">
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;