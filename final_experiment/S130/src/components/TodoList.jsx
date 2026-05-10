import TodoItem from "./TodoItem";
import { useTodos } from "../hooks/useTodos";

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
}