// app/TodoApp.jsx

import { useTodos } from "../hooks/useTodos";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

export default function TodoApp() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
  } = useTodos();

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div>
      <h1>Production Todo System</h1>

      <TodoInput onAdd={addTodo} />

      <p>{activeCount} items left</p>

      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <button onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}