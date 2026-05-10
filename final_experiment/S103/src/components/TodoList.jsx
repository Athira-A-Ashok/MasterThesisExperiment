import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { state } = useTodos();

  const filtered = state.todos.filter(todo => {
    if (state.filter === "ACTIVE") return !todo.completed;
    if (state.filter === "COMPLETED") return todo.completed;
    return true;
  });

  return (
    <ul>
      {filtered.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}