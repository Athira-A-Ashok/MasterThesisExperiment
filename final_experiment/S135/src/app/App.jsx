import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useTodos } from "../hooks/useTodos";
import { useMemo } from "react";

const App = () => {
  const {
    todos,
    activeTodos,
    completedTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();

  const remaining = useMemo(
    () => activeTodos.length,
    [activeTodos]
  );

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <p>{remaining} items left</p>

      <h3>All Tasks</h3>
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />

      <h3>Active</h3>
      <TodoList
        todos={activeTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />

      <h3>Completed</h3>
      <TodoList
        todos={completedTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
      />
    </div>
  );
};

export default App;