import { useTodos } from "../hooks/useTodos";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import TodoStats from "../components/TodoStats";
import TodoFilters from "../components/TodoFilters";

export default function TodoApp() {
  const todoApi = useTodos();

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2>Todo App</h2>

      <TodoInput addTodo={todoApi.addTodo} />
      <TodoStats stats={todoApi.stats} />

      <TodoList
        todos={todoApi.todos}
        toggleTodo={todoApi.toggleTodo}
        deleteTodo={todoApi.deleteTodo}
      />

      <TodoFilters clearCompleted={todoApi.clearCompleted} />
    </div>
  );
}