import useTodos from "./hooks/useTodos";
import useFilter from "./hooks/useFilter";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import TodoFooter from "./components/TodoFooter";

export default function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, clearCompleted } =
    useTodos();

  const { filter, setFilter, filteredTodos, activeCount } =
    useFilter(todos);

  return (
    <div>
      <h1>Todo App</h1>

      <TodoInput onAdd={addTodo} />

      <TodoFilter filter={filter} setFilter={setFilter} />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />

      <TodoFooter count={activeCount} onClear={clearCompleted} />
    </div>
  );
}